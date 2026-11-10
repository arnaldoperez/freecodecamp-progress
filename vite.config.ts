import { defineConfig, type Plugin, type ViteDevServer, type PreviewServer } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { parseFCCUserData } from './src/services/fccParser.ts'

function fccJsonPlugin(): Plugin {
  const handler = async (req: any, res: any, next: any) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const username = url.searchParams.get('username') || url.searchParams.get('u');
      const format = url.searchParams.get('format') || url.searchParams.get('view');
      const isJson = format === 'json' || url.searchParams.get('json') === 'true';

      // Only handle if json format is explicitly requested
      if (!isJson) {
        return next();
      }

      // Handle CORS preflight
      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.end();
        return;
      }

      if (!username) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ error: 'El parámetro "username" es requerido cuando format=json está activo.' }, null, 2));
        return;
      }

      const skipUnstarted = url.searchParams.get('skipUnstarted') === 'true';

      const fccUrl = `https://api.freecodecamp.org/users/get-public-profile?username=${encodeURIComponent(username.trim().toLowerCase())}`;
      const fccRes = await fetch(fccUrl, {
        headers: { Accept: 'application/json' }
      });

      if (fccRes.status === 404) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ error: `Usuario "${username}" no fue encontrado en freeCodeCamp.` }, null, 2));
        return;
      }

      if (!fccRes.ok) {
        res.statusCode = fccRes.status;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ error: `Error al consultar freeCodeCamp: ${fccRes.statusText}` }, null, 2));
        return;
      }

      const fccData = await fccRes.json();
      const parsed = parseFCCUserData(fccData, { skipUnstarted });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify(parsed.blocks, null, 2));
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify({ error: err.message || 'Error interno del servidor.' }, null, 2));
    }
  };

  return {
    name: 'fcc-json-handler',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(handler);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fccJsonPlugin()
  ],
  server: {
    proxy: {
      '/fcc-api': {
        target: 'https://api.freecodecamp.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fcc-api/, '')
      }
    }
  }
})
