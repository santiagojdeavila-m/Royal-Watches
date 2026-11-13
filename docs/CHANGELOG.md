## [0.0.1](12/07/2026)

- se creó el README del proyecto.
- Se añadió index.html.
- Se creó la estructura inicial.

## (13/07/2026)
- se creó el ROYAL_WATCHES_GUIDE del proyecto.

## (14/07/2026)
- empecé a elaborar el header del body del proyecto.
- incorpore el logo de la página con html.
- hice el menú de navegacion con html.

## (16/07/2026)
- terminé la estructura HTML del hero.
- realice commit #1 del proyecto.

## (28/08/2026)
- layout del header y hero completados.

## (01/09/2026)
- finalizacion de estructura html y estilos css para productos destacados y marcas.
- estructura html y estilos css para cta y footer completados.

## (07/09/2026)
- Se completó el diseño responsive de la landing page.
- Se ajustó el comportamiento responsive del menú de navegación.

## (15/09/2026)
- Se implementó el renderizado dinámico de productos en la landing page.
- Se creó la página del catálogo con tarjetas de productos y diseño responsive.
- Se eliminaron las tarjetas de productos que estaban escritas directamente en HTML.

## (24/09/2026)
- Se amplió el catálogo con nuevos productos y referencias de distintas marcas.

## (25/09/2026)
- Se separaron los productos destacados del catálogo completo.
- Se implementó la búsqueda de productos.
- Se incorporaron filtros por marca y ordenamiento por precio.
- Se añadieron los controles visuales de búsqueda y filtrado.

## (30/09/2026)
- Se conectaron los controles de búsqueda, filtrado y ordenamiento con la lógica del catálogo.
- Se mejoraron los estilos de los botones de búsqueda y filtros.

## (06/10/2026)
- Se creó la página de detalle de producto.
- Se incorporó el diseño del carrito de compras lateral.
- Se realizaron ajustes responsive para las nuevas funcionalidades.

## (07/10/2026)
- Se implementó la lógica del carrito de compras.
- Se añadieron cantidades, cálculo del total y persistencia mediante localStorage.
- Se corrigieron rutas de imágenes para garantizar su funcionamiento en GitHub Pages y en las diferentes páginas.

## (13/10/2026)
- Se crearon las páginas de inicio de sesión, registro y recuperación de contraseña.
- Se implementó el diseño responsive de los formularios.
- Se desarrollaron validaciones de campos para los formularios de autenticación.

## (21/10/2026)
- Se inició la implementación del backend utilizando Node.js y Express.
- Se creó la estructura inicial del servidor.
- Se incorporaron las primeras rutas y controladores de productos.

## (22/10/2026)
- Se implementaron controladores para gestionar productos desde el backend.
- Se incorporó una respuesta 404 para recursos no encontrados.
- Se integraron los primeros cambios mediante Pull Requests en GitHub.

## (23/10/2026)
- Se continuó con la integración del backend y sus funcionalidades.

## (27/10/2026)
- Se conectó el backend con MongoDB Atlas utilizando Mongoose.
- Se incorporó la configuración mediante variables de entorno.
- Se creó el modelo de usuarios con validaciones y restricción de correo electrónico único.

## (29/10/2026)
- Se implementó el CRUD de usuarios.
- Se incorporaron el modelo, controlador y rutas correspondientes.

## (30/10/2026)
- Se implementaron funcionalidades de edición y eliminación de usuarios.
- Se creó una página de prueba para gestionar usuarios desde el frontend.
- Se conectó la interfaz de prueba con las operaciones del backend.

## (03/11/2026)
- Se integraron mediante Pull Requests los avances de gestión de usuarios y la interfaz de prueba.

## (04/11/2026)
- Se creó el modelo de productos utilizando Mongoose.

## (05/11/2026)
- Se implementó la lectura de productos desde MongoDB.
- Se desarrolló un script seed para cargar datos iniciales de productos.
- Se incorporaron las operaciones de creación, edición y eliminación de productos.
- Se creó una interfaz de prueba para gestionar productos desde el frontend.

## (08/11/2026)
- Se incorporó el filtrado de usuarios por rol en el listado de usuarios.
- Se realizaron ajustes en el modelo y controlador de usuarios.
- Se integraron nuevos cambios mediante Pull Requests.

## [1.0.0] - 2026-11-13
### Añadido
- Asistente de recomendaciones con IA (Groq) y límite de uso.
- Límite de intentos en registro, login e IA.
- Configuración de producción: `PORT`, `trust proxy` y CORS por variable de entorno.
- `.env.example` y README actualizado.
### Eliminado
- Archivos sin uso (componentePorRol, App.css, assets, TarjetaProducto, package-lock de la raíz).