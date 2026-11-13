# Royal Watches

Tienda web ficticia de relojes de lujo. Proyecto de aprendizaje de desarrollo web (versión 1.0).

## Tecnologías
- **Frontend 1:** HTML, CSS y JavaScript puro (GitHub Pages): inicio, catálogo, detalle, login, registro, recuperar.
- **Frontend 2:** React 19 + Vite (`frontend-react/`): login, panel de usuario, administración de productos y asistente de IA.
- **Backend:** Node 24, Express 5, Mongoose 9, JWT, bcrypt, express-rate-limit (`backend/`).
- **Base de datos:** MongoDB Atlas (`royal_watches`).
- **IA:** Groq (API compatible con OpenAI), llamada solo desde el backend.

## Estructura del backend
`routes → controllers → models`. Solo `models/` toca MongoDB. La API devuelve `id` (no `_id`) y los controladores usan lista blanca de campos.

## Puesta en marcha local
```bash
# Backend
cd backend
npm install
cp .env.example .env   # completa los valores
npm run dev            # http://localhost:4000

# React
cd frontend-react
npm install
npm run dev            # http://localhost:5173
```
Variable opcional del frontend React: `VITE_API_URL` (ver `frontend-react/.env.example`).

## Endpoints principales
| Ruta | Acceso |
|---|---|
| `POST /api/auth/registro`, `POST /api/auth/login` | Público (con límite de intentos) |
| `GET /api/auth/yo`, `/api/opciones`, `/api/perfil` | Con sesión |
| `GET /api/productos` | Público |
| `POST/PATCH/DELETE /api/productos` | Según permiso (editor/admin) |
| `/api/usuarios` | Solo admin |
| `POST /api/ia/recomendar` | Con sesión (con límite de uso) |

## Roles
`cliente`, `editor`, `admin`. La autorización se comprueba siempre en el servidor.

## Seguridad
- Contraseñas con bcrypt; sesión con JWT; `.env` fuera de Git.
- Límite de intentos en registro, login e IA.
- La IA solo recibe nombre, marca, precio y descripción de productos; nunca datos de usuarios.

## Despliegue
- Backend en Render (Root Directory `backend`), frontend React en Vercel, base en MongoDB Atlas, páginas HTML en GitHub Pages.
- Variables del backend: ver `backend/.env.example`. `FRONTEND_ORIGINS` debe incluir los orígenes publicados.
- Atlas permite acceso desde cualquier IP porque el plan gratuito del hosting no tiene IP fija; la protección es el usuario de base de datos con permisos mínimos y contraseña fuerte.
- El plan gratuito de Render duerme el servicio tras inactividad: la primera petición puede tardar hasta un minuto.

## Pendientes conocidos
- Los tokens emitidos siguen válidos tras cambiar la contraseña.
- `js/main.js` usa `innerHTML` con datos de producto (riesgo XSS): falta escapar.
- El catálogo HTML aún lee un arreglo local, no la API.
- Dos sesiones separadas (páginas HTML y React), porque `localStorage` es por origen.
- Código duplicado: lista de contraseñas comunes y lógica de sesión.
- Migración futura a base de datos relacional.