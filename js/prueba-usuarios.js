const API = "http://localhost:4000/api/usuarios";

const mensaje = document.querySelector("#prueba-mensaje");
const lista = document.querySelector("#lista-usuarios");
const textoSesion = document.querySelector("#prueba-sesion");

function leerSesion() {
    try {
        return JSON.parse(localStorage.getItem("sesion"));
    } catch (error) {
        return null;
    }
}

function mostrarSesion() {
    const sesion = leerSesion();

    if (sesion && sesion.usuario) {
        textoSesion.textContent = "Sesión: " + sesion.usuario.nombre + " (" + sesion.usuario.rol + ")";
    } else {
        textoSesion.textContent = "Sin sesión. Inicia sesión como administrador en login.html.";
    }
}

function cabeceras(extra) {
    const resultado = Object.assign({}, extra);
    const sesion = leerSesion();

    if (sesion && sesion.token) {
        resultado["Authorization"] = "Bearer " + sesion.token;
    }

    return resultado;
}

function textoDeError(datos) {
    if (Array.isArray(datos.errores)) {
        return datos.errores.join(". ");
    }
    return datos.mensaje || "Ocurrió un error";
}

function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    mensaje.className = esError ? "mensaje-error" : "mensaje-exito";
}

function crearBoton(texto, accion, usuario) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.dataset.accion = accion;
    boton.dataset.id = usuario.id;
    boton.dataset.nombre = usuario.nombre;
    boton.dataset.correo = usuario.correo;
    return boton;
}

function dibujarUsuarios(usuarios) {
    lista.innerHTML = "";

    usuarios.forEach(function (usuario) {
        const item = document.createElement("li");
        item.classList.add("usuario-item");

        const texto = document.createElement("span");
        texto.textContent = usuario.nombre + " (" + usuario.correo + ") - " + usuario.rol;

        const acciones = document.createElement("span");
        acciones.classList.add("usuario-acciones");
        acciones.appendChild(crearBoton("Editar", "editar", usuario));
        acciones.appendChild(crearBoton("Eliminar", "eliminar", usuario));

        item.appendChild(texto);
        item.appendChild(acciones);
        lista.appendChild(item);
    });
}

async function cargarUsuarios() {
    try {
        const respuesta = await fetch(API, { headers: cabeceras({}) });
        const usuarios = await respuesta.json();

        if (!respuesta.ok) {
            lista.innerHTML = "";
            mostrarMensaje(textoDeError(usuarios), true);
            return;
        }

        dibujarUsuarios(usuarios);
    } catch (error) {
        mostrarMensaje("No se pudo conectar con el servidor. ¿Está encendido?", true);
    }
}

async function enviarCambio(url, metodo, cuerpo) {
    try {
        const opciones = { method: metodo, headers: cabeceras({}) };

        if (cuerpo) {
            opciones.headers["Content-Type"] = "application/json";
            opciones.body = JSON.stringify(cuerpo);
        }

        const respuesta = await fetch(url, opciones);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarMensaje(textoDeError(datos), true);
            return;
        }

        mostrarMensaje(metodo === "DELETE" ? "Usuario eliminado" : "Usuario actualizado", false);
        cargarUsuarios();
    } catch (error) {
        mostrarMensaje("No se pudo conectar con el servidor. ¿Está encendido?", true);
    }
}

lista.addEventListener("click", function (event) {
    const boton = event.target;
    const accion = boton.dataset.accion;

    if (!accion) {
        return;
    }

    const url = API + "/" + boton.dataset.id;

    if (accion === "eliminar") {
        const seguro = confirm("¿Eliminar a " + boton.dataset.nombre + "?");
        if (seguro) {
            enviarCambio(url, "DELETE");
        }
    }

    if (accion === "editar") {
        const nuevoNombre = prompt("Nuevo nombre:", boton.dataset.nombre);
        if (nuevoNombre === null) {
            return;
        }
        const nuevoCorreo = prompt("Nuevo correo:", boton.dataset.correo);
        if (nuevoCorreo === null) {
            return;
        }
        enviarCambio(url, "PATCH", { nombre: nuevoNombre, correo: nuevoCorreo });
    }
});

mostrarSesion();
cargarUsuarios();