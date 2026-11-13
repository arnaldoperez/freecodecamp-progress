/**
 * Service to fetch FreeCodeCamp user profiles from the browser SPA.
 */

export async function fetchFCCUser(username: string): Promise<any> {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    throw new Error('Por favor, ingresa un nombre de usuario válido.');
  }

  const fccUrl = `https://api.freecodecamp.org/users/get-public-profile?username=${encodeURIComponent(cleanUsername)}`;

  const isLocal = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // In production (e.g. Render static site), use AllOrigins CORS proxy directly to avoid 404 in console.
  // In local dev, use the local Vite proxy.
  const endpoints: { url: string }[] = isLocal
    ? [
        { url: `/fcc-api/users/get-public-profile?username=${encodeURIComponent(cleanUsername)}` },
        { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(fccUrl)}` },
        { url: fccUrl }
      ]
    : [
        { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(fccUrl)}` },
        { url: `/fcc-api/users/get-public-profile?username=${encodeURIComponent(cleanUsername)}` },
        { url: fccUrl }
      ];

  let fccUserNotFound = false;

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(endpoint.url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json'
        }
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';

      // If the response is not JSON (e.g. 404 HTML/text page from static hosting), skip this endpoint
      if (!contentType.includes('application/json')) {
        continue;
      }

      const data = await res.json();

      // Check if FreeCodeCamp explicitly returned a 404 / user not found error object
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

      // If shape didn't match, continue to next fallback
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
