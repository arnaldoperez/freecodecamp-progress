/**
 * Service to fetch FreeCodeCamp user profiles from the browser SPA (100% static client-side).
 */

export async function fetchFCCUser(username: string): Promise<any> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    throw new Error('Por favor, ingresa un nombre de usuario válido.');
  }

  // Use environment variable for the FreeCodeCamp API URL with fallback
  const apiBaseUrl = import.meta.env.VITE_FCC_API_URL || 'https://api.freecodecamp.org/users/get-public-profile';
  const fccUrl = `${apiBaseUrl}?username=${encodeURIComponent(cleanUsername)}`;

  // Candidate endpoints with extraction logic
  const endpoints: {
    url: string;
    extract: (json: any) => any;
  }[] = [
    // 1. AllOrigins JSON wrapper (most reliable for public browser requests)
    {
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(fccUrl)}`,
      extract: (data: any) => {
        if (data && typeof data.contents === 'string') {
          return JSON.parse(data.contents);
        }
        return data;
      }
    },
    // 2. AllOrigins raw endpoint (fallback)
    {
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(fccUrl)}`,
      extract: (data: any) => data
    },
    // 3. Direct freeCodeCamp API call (works if CORS is unblocked)
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
        headers: {
          Accept: 'application/json'
        }
      });
      clearTimeout(timeoutId);

      const text = await res.text();
      let rawJson: any;
      try {
        rawJson = JSON.parse(text);
      } catch {
        // Not a JSON response (e.g. HTML error from a proxy), try next endpoint
        continue;
      }

      let data: any;
      try {
        data = endpoint.extract(rawJson);
      } catch {
        continue;
      }

      // Check if FreeCodeCamp explicitly returned a 404 / user not found error object
      if (res.status === 404 || (data && data.error && typeof data.error === 'string' && data.error.includes('not found'))) {
        fccUserNotFound = true;
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
      // Continue to next endpoint
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
