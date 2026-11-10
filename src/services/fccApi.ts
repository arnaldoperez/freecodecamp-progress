/**
 * Service to fetch FreeCodeCamp user profiles from the browser SPA.
 */

export async function fetchFCCUser(username: string): Promise<any> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    throw new Error('Por favor, ingresa un nombre de usuario válido.');
  }

  const fccUrl = `https://api.freecodecamp.org/users/get-public-profile?username=${encodeURIComponent(cleanUsername)}`;

  // List of endpoints / proxies to try in order
  const endpoints: { url: string; parse: (res: Response) => Promise<any> }[] = [
    // 1. Vite dev proxy (when running in local dev)
    {
      url: `/fcc-api/users/get-public-profile?username=${encodeURIComponent(cleanUsername)}`,
      parse: (res) => res.json()
    },
    // 2. Direct freeCodeCamp API call
    {
      url: fccUrl,
      parse: (res) => res.json()
    },
    // 3. AllOrigins raw proxy
    {
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(fccUrl)}`,
      parse: (res) => res.json()
    },
    // 4. CorsProxy.io
    {
      url: `https://corsproxy.io/?url=${encodeURIComponent(fccUrl)}`,
      parse: (res) => res.json()
    }
  ];

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const res = await fetch(endpoint.url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (res.status === 404) {
        throw new Error(
          `El usuario "${cleanUsername}" no fue encontrado en freeCodeCamp. Verifica que el nombre esté bien escrito.`
        );
      }

      if (!res.ok) {
        continue;
      }

      const data = await endpoint.parse(res);

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

      // If json parsed but doesn't have expected shape, try next
      continue;
    } catch (err: any) {
      if (err.message && err.message.includes('no fue encontrado')) {
        throw err;
      }
      // Continue to next fallback endpoint
    }
  }

  throw new Error(
    `No se pudo conectar directamente con freeCodeCamp para "${cleanUsername}" (restricciones de CORS en el navegador). ` +
      `Puedes abrir su perfil en una pestaña nueva (${fccUrl}), copiar el JSON y pegarlo en la pestaña "Pegar / Subir JSON".`
  );
}
