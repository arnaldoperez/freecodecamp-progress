/**
 * Service to fetch FreeCodeCamp user profiles from the browser SPA.
 * If VITE_API_URL is configured, it can query the companion Express API directly.
 * Otherwise, it queries freeCodeCamp using CORS proxies.
 */

export async function fetchFCCUser(username: string): Promise<any> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    throw new Error('Por favor, ingresa un nombre de usuario válido.');
  }

  // 1. If a dedicated backend API URL is configured in environment variables:
  const backendApiUrl = import.meta.env.VITE_API_URL;
  if (backendApiUrl) {
    try {
      const trimmedBackend = backendApiUrl.replace(/\/$/, '');
      const backendEndpoint = `${trimmedBackend}/api/user/${encodeURIComponent(cleanUsername)}`;
      const res = await fetch(backendEndpoint);
      if (res.ok) {
        const blocks = await res.json();
        // Wrap blocks in format expected by parser or return directly
        return {
          entities: {
            user: {
              [cleanUsername]: {
                username: cleanUsername,
                completedChallenges: []
              }
            }
          },
          result: cleanUsername,
          _preparsedBlocks: blocks
        };
      }
    } catch {
      // If backend call fails, fallback to direct freeCodeCamp fetching
    }
  }

  // 2. Direct / Proxy freeCodeCamp fetching
  const apiBaseUrl = import.meta.env.VITE_FCC_API_URL || 'https://api.freecodecamp.org/users/get-public-profile';
  const fccUrl = `${apiBaseUrl}?username=${encodeURIComponent(cleanUsername)}`;

  const endpoints: {
    url: string;
    extract: (json: any) => any;
  }[] = [
    // AllOrigins JSON wrapper
    {
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(fccUrl)}`,
      extract: (data: any) => {
        if (data && typeof data.contents === 'string') {
          return JSON.parse(data.contents);
        }
        return data;
      }
    },
    // AllOrigins raw endpoint
    {
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(fccUrl)}`,
      extract: (data: any) => data
    },
    // Direct call
    {
      url: fccUrl,
      extract: (data: any) => data
    }
  ];

  let fccUserNotFound = false;

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(endpoint.url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });
      clearTimeout(timeoutId);

      const text = await res.text();
      let rawJson: any;
      try {
        rawJson = JSON.parse(text);
      } catch {
        continue;
      }

      let data: any;
      try {
        data = endpoint.extract(rawJson);
      } catch {
        continue;
      }

      if (res.status === 404 || (data && data.error && typeof data.error === 'string' && data.error.includes('not found'))) {
        fccUserNotFound = true;
        continue;
      }

      if (!res.ok) {
        continue;
      }

      if (data && data.entities && data.entities.user) {
        const foundUser = data.entities.user[cleanUsername] || data.entities.user[data.result];
        if (!foundUser) {
          throw new Error(`El perfil del usuario "${cleanUsername}" es privado o no contiene datos públicos.`);
        }
        return data;
      }

      if (data && Array.isArray(data.completedChallenges)) {
        return data;
      }

      continue;
    } catch (err: any) {
      if (err.message && err.message.includes('es privado')) {
        throw err;
      }
    }
  }

  if (fccUserNotFound) {
    throw new Error(
      `El usuario "${cleanUsername}" no fue encontrado en freeCodeCamp. Verifica que el nombre esté bien escrito.`
    );
  }

  throw new Error(
    `No se pudo conectar con freeCodeCamp para el usuario "${cleanUsername}". ` +
      `Verifica tu conexión o que el perfil sea público en ${fccUrl}.`
  );
}
