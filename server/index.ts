import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { parseFCCUserData } from '../src/services/fccParser.ts';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'fcc-progress-api' });
});

// Root information endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'FreeCodeCamp Progress API',
    endpoints: {
      userChallenges: '/api/user/:username?skipUnstarted=true',
      health: '/health'
    }
  });
});

/**
 * Handler for fetching and parsing FreeCodeCamp user challenges.
 */
async function handleUserChallenges(req: Request, res: Response): Promise<void> {
  const usernameParam = req.params.username;
  const username = Array.isArray(usernameParam) ? usernameParam[0] : usernameParam;
  const skipUnstarted = req.query.skipUnstarted === 'true';

  if (!username || !username.trim()) {
    res.status(400).json({ error: 'Parámetro "username" es requerido.' });
    return;
  }

  const cleanUsername = username.trim().toLowerCase();
  const fccUrl = `https://api.freecodecamp.org/users/get-public-profile?username=${encodeURIComponent(cleanUsername)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(fccUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    clearTimeout(timeoutId);

    if (response.status === 404) {
      res.status(404).json({ error: `Usuario "${cleanUsername}" no fue encontrado en freeCodeCamp.` });
      return;
    }

    if (!response.ok) {
      res.status(response.status).json({ error: `Error de la API de freeCodeCamp: ${response.statusText}` });
      return;
    }

    const userData: any = await response.json();

    // Verify user exists in the returned entities
    if (!userData || !userData.entities || !userData.entities.user) {
      res.status(404).json({ error: `El usuario "${cleanUsername}" no contiene datos públicos en freeCodeCamp.` });
      return;
    }

    const userProfile = userData.entities.user[cleanUsername] || userData.entities.user[userData.result];
    if (!userProfile) {
      res.status(404).json({ error: `Perfil de "${cleanUsername}" no encontrado o es privado.` });
      return;
    }

    // Unified parsing logic
    const parsed = parseFCCUserData(userData, { skipUnstarted });

    // Respond with application/json
    res.status(200).json(parsed.blocks);
  } catch (error: any) {
    if (error.name === 'AbortError') {
      res.status(504).json({ error: 'Tiempo de espera agotado al consultar freeCodeCamp.' });
      return;
    }
    console.error('Error procesando usuario:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor.' });
  }
}

// REST Endpoints
app.get('/api/user/:username', handleUserChallenges);
app.get('/api/get-user-challenges/:username', handleUserChallenges);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[fcc-api] Servidor Express activo en el puerto ${PORT}`);
});

export default app;
