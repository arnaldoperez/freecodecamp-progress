# FreeCodeCamp Tracker: SPA & REST API

Monorepositorio con lógica de análisis unificada para **freeCodeCamp**: incluye una **SPA estática puramente visual** y una **API REST en Express** para consultas HTTP/JSON desde `fetch`, Postman o cualquier cliente externo.

Ambas aplicaciones comparten el mismo motor de parseo y el catálogo de más de 720 bloques curriculares (`v9`, `v8`, legacy, etc.), pero se construyen y despliegan por separado.

---

## 🏗️ Estructura del Proyecto

```text
├── server/
│   └── index.ts                 # API REST en Express para peticiones HTTP/JSON
├── src/
│   ├── App.tsx                  # SPA estática puramente visual (sin vistas JSON)
│   ├── services/
│   │   ├── fccParser.ts         # Motor de parseo UNIFICADO (usado por la SPA y la API)
│   │   └── fccApi.ts            # Cliente de consulta para el frontend
│   ├── data/
│   │   └── curriculumBlocks.json # Catálogo completo de bloques curriculares FCC
│   └── types/                   # Definiciones TypeScript compartidas
└── dist/                        # Salida estática compilada de la SPA
```

---

## 1. 🌐 API REST (Express)

Servidor HTTP optimizado para responder con `application/json; charset=utf-8` y cabeceras CORS activas (`Access-Control-Allow-Origin: *`). Compatible con Postman, `fetch()`, curl y cualquier lenguaje o cliente backend.

### Endpoints
* `GET /health`: Estado del servicio (`{"status":"ok"}`).
* `GET /api/user/:username`: Retorna el mapa de bloques agrupados del usuario.
* `GET /api/user/:username?skipUnstarted=true`: Retorna únicamente los bloques con progreso (`started: true`).
* *(Alias de compatibilidad: `/api/get-user-challenges/:username`)*

### Ejecución Local
```bash
# Iniciar servidor Express en desarrollo (puerto 3000 por defecto)
npm run dev:server

# Iniciar servidor en producción
npm start
```

### Despliegue en Render (Web Service)
* **Tipo de servicio:** Web Service
* **Build Command:** `npm install`
* **Start Command:** `npm start`
* **Environment Variables:** `PORT=3000` (o el asignado automáticamente)

---

## 2. 📊 SPA Estática (React + Vite)

Interfaz interactiva puramente visual:
* Búsqueda por nombre de usuario sincronizada en la URL (`?username=...`).
* Ocultar bloques sin iniciar (`skipUnstarted`).
* Navegación fluida por niveles: **Superbloques → Módulos → Bloques**.
* Filtros por estado (*Todos*, *En progreso*, *Completados*, *Sin iniciar*) y buscador de texto en tiempo real.
* Barras de progreso, porcentajes y tarjetas de estado.

### Ejecución Local
```bash
npm run dev
```
Abre [http://localhost:5173](http://localhost:5173).

### Compilación y Despliegue en Render (Static Site)
* **Tipo de servicio:** Static Site
* **Build Command:** `npm run build`
* **Publish Directory:** `dist`
* **Environment Variables (opcional):**
  * `VITE_API_URL`: URL del backend Express desplegado (ej: `https://tu-api.onrender.com`). Si no se define, la SPA usa el modo cliente standalone.
