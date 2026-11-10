# FreeCodeCamp Parser SPA

Aplicación de página única (SPA) desarrollada con **React 19**, **TypeScript** y **Vite** para parsear el progreso y los desafíos completados de usuarios de freeCodeCamp, mostrando los resultados en **formato visual interactivo** y en **formato JSON exportable**, sin necesidad de ningún backend o servidor Express.

## ✨ Características

- **100% Client-side (SPA)**: Todo el procesamiento y agrupación de datos curriculares se ejecuta directamente en el navegador.
- **Sin Express ni backend**: Se eliminó la dependencia de un servidor Node/Express intermedio.
- **Doble formato de visualización**:
  - 📊 **Vista Visual**: Navegación jerárquica (Superbloques → Módulos → Bloques), barras de progreso, porcentajes, contadores de retos completados, filtro por estado (*En progreso*, *Completado*, *Sin iniciar*) y buscador en tiempo real.
  - 📋 **Vista JSON**: Visualizador de JSON formateado, botón de un clic para copiar al portapapeles y botón para descargar el archivo `.json` generado (`parsed` o `raw`).
- **Opciones de entrada**:
  - Búsqueda por nombre de usuario de freeCodeCamp (con soporte para proxy de desarrollo en Vite y proxies CORS automáticos).
  - Pestaña para **pegar texto JSON** o **subir archivo `.json`** directamente (ideal para perfiles privados o uso sin conexión).
  - Opción `skipUnstarted` para omitir bloques con 0% de progreso.
- **Catálogo curricular completo**: Más de 700 bloques de freeCodeCamp preindexados (v9, v8, legacy y tracks de desarrollo web, JavaScript, Python, C#, etc.).

## 🚀 Inicio Rápido

### Desarrollo
```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Compilación para Producción (SPA estática)
```bash
npm run build
```

Genera la carpeta `dist/` lista para ser desplegada en cualquier servidor estático (GitHub Pages, Vercel, Netlify, Cloudflare Pages, S3, etc.).

### Previsualización
```bash
npm run preview
```
