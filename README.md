# ⌚ Royal Watches

**El tiempo con estilo.**

Royal Watches es un proyecto de desarrollo de una tienda online de relojes, creado con el propósito de construir una aplicación web moderna, elegante, responsive y funcional.

El proyecto combina el desarrollo frontend con una arquitectura backend y una base de datos, permitiendo implementar funcionalidades reales de gestión de productos y usuarios.

Además, constituye un proyecto de aprendizaje práctico en ingeniería de software, aplicando buenas prácticas, organización del código, control de versiones y trabajo colaborativo.

---

## 📖 Descripción

Royal Watches es una tienda online ficticia especializada en relojes de diferentes marcas, entre ellas:

- Rolex
- Hublot
- Richard Mille
- Patek Philippe
- Cartier
- Curren

El objetivo es ofrecer una experiencia de navegación moderna y elegante, con un catálogo organizado, información detallada de los productos y funcionalidades orientadas a la gestión de una tienda online.

---

## 🎯 Objetivos del proyecto

- Desarrollar una aplicación web con una estructura profesional.
- Aplicar principios de HTML semántico y accesibilidad.
- Implementar interfaces interactivas y adaptables a diferentes dispositivos.
- Comprender la comunicación entre frontend y backend.
- Implementar una API REST utilizando Node.js y Express.
- Gestionar información mediante MongoDB y Mongoose.
- Desarrollar operaciones CRUD para usuarios y productos.
- Aprender autenticación, autorización y gestión de roles.
- Aplicar Git y GitHub para el control de versiones y la colaboración.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage

### Backend
- Node.js
- Express.js
- JavaScript
- CORS
- dotenv

### Base de datos
- MongoDB Atlas
- Mongoose

### Herramientas de desarrollo
- Visual Studio Code
- Git
- GitHub
- Live Server
- Thunder Client

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

- Node.js y npm.
- Visual Studio Code.
- Extensión Live Server para ejecutar el frontend.
- Una cuenta y un clúster de MongoDB Atlas.
- Git (opcional para clonar y gestionar el repositorio).

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/santiagojdeavila-m/Royal-Watches.git
```

Entrar en la carpeta del proyecto:

```bash
cd Royal-Watches
```

### 2. Configurar el backend

Entrar en la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear manualmente un archivo llamado `.env` dentro de la carpeta `backend`.

Su contenido debe incluir:

```env
MONGODB_URI=tu_uri_de_mongodb_atlas
```

Reemplazar el valor por la cadena de conexión correspondiente al clúster de MongoDB Atlas.

**Importante:** el archivo `.env` contiene información privada y no debe subirse al repositorio.

### 4. Ejecutar el backend

Desde la carpeta `backend`, iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

`http://localhost:4000`

Para comprobar su funcionamiento:

- `http://localhost:4000/` — Mensaje de funcionamiento del servidor.
- `http://localhost:4000/api/salud` — Comprobación del estado de la API.

### 5. Cargar los datos iniciales

Desde la carpeta `backend`, ejecutar:

```bash
npm run seed
```

Este comando ejecuta el script encargado de cargar los productos iniciales en la base de datos.

### 6. Ejecutar el frontend

Con el backend en funcionamiento:

1. Abrir la carpeta raíz del proyecto en Visual Studio Code.
2. Localizar el archivo `index.html`.
3. Abrirlo utilizando la extensión Live Server.

El frontend se ejecutará normalmente en:

`http://127.0.0.1:5500`

**Nota:** el frontend y el backend se ejecutan de manera independiente, por lo que es necesario mantener ambos procesos activos para probar las funcionalidades que requieren comunicación con la API.

---

## 📂 Estructura del proyecto

```text
Royal-Watches/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── productos.controller.js
│   │   └── usuarios.controller.js
│   │
│   ├── data/
│   │   └── productos.js
│   │
│   ├── models/
│   │   ├── producto.model.js
│   │   └── usuario.model.js
│   │
│   ├── routes/
│   │   ├── productos.routes.js
│   │   └── usuarios.routes.js
│   │
│   ├── seed/
│   │   └── productos.seed.js
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── docs/
│   ├── CHANGELOG.md
│   └── ROYAL_WATCHES_GUIDE.md
│
├── img/
│   ├── img-catalogo/
│   ├── marcas/
│   ├── logo.png
│   └── watch.png
│
├── js/
│   ├── main.js
│   ├── validaciones.js
│   ├── prueba-usuarios.js
│   └── prueba-productos.js
│
├── pages/
│   ├── catalogo.html
│   ├── detalle.html
│   ├── login.html
│   ├── registro.html
│   ├── recuperar.html
│   ├── prueba-usuarios.html
│   └── prueba-productos.html
│
├── index.html
└── README.md
```

---

## ✨ Funcionalidades implementadas

### Interfaz y experiencia de usuario
- Landing page con identidad visual de Royal Watches.
- Diseño responsive para diferentes dispositivos.
- Secciones de productos destacados y marcas.
- Navegación entre las diferentes páginas.

### Catálogo de productos
- Renderizado dinámico de productos.
- Catálogo organizado por marcas.
- Búsqueda de productos.
- Filtros por marca.
- Ordenamiento por precio.
- Página de detalle de producto.

### Carrito de compras
- Agregar y eliminar productos.
- Modificar cantidades.
- Cálculo automático del total.
- Persistencia de información mediante LocalStorage.

### Formularios
- Páginas de inicio de sesión, registro y recuperación de contraseña.
- Validaciones frontend de los campos.

### Backend y base de datos
- Servidor desarrollado con Node.js y Express.
- Conexión a MongoDB Atlas mediante Mongoose.
- Modelos de usuarios y productos.
- API para gestionar usuarios y productos.
- Operaciones CRUD de usuarios y productos.
- Validaciones en los modelos.
- Carga inicial de productos mediante un script seed.
- Filtrado de usuarios por rol.

---

## 📈 Estado actual del proyecto

**En desarrollo.**

El proyecto cuenta con una interfaz frontend funcional, un backend desarrollado con Express y una base de datos MongoDB Atlas.

Actualmente se han implementado operaciones CRUD para usuarios y productos, además de interfaces de prueba que permiten verificar la comunicación entre el frontend y el backend.

El desarrollo continúa enfocado en consolidar la arquitectura de la aplicación e implementar funcionalidades de seguridad y gestión de usuarios.

### Funcionalidades pendientes

- Implementar autenticación real de usuarios.
- Incorporar registro e inicio de sesión conectados al backend.
- Implementar cifrado seguro de contraseñas mediante hashing.
- Gestionar sesiones o tokens de autenticación.
- Implementar autorización mediante roles y permisos.
- Proteger rutas y operaciones según los permisos del usuario.
- Desarrollar el panel de administración.
- Implementar funcionalidades completas del perfil de usuario.
- Integrar las funcionalidades pendientes del proceso de compra.
- Realizar pruebas y mejorar la seguridad de la aplicación.
- Desplegar la aplicación en un entorno de producción.

---

## 📚 Metodología de desarrollo

Royal Watches se desarrolla mediante una metodología de aprendizaje práctico y progresivo.

El proyecto busca comprender tanto la implementación como los fundamentos técnicos detrás de cada funcionalidad.

Se utilizan Git y GitHub para gestionar los cambios, trabajar con ramas, realizar integraciones mediante Pull Requests y mantener un historial organizado del desarrollo.

El trabajo se realiza de manera colaborativa, combinando investigación, planificación, implementación y pruebas.

---

## 👨‍💻 Autores

Desarrollado por:

- Santiago J. De Ávila M.
- Jose A. Olivero O.

Proyecto educativo de desarrollo web e ingeniería de software, con acompañamiento de herramientas de inteligencia artificial y orientación docente.

---

## 📄 Licencia

Proyecto desarrollado con fines educativos y de aprendizaje.