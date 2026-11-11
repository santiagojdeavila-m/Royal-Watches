const API = "http://localhost:4000/api/productos";

const formulario = document.querySelector("#form-producto-prueba");
const campoNombre = document.querySelector("#prueba-nombre");
const campoMarca = document.querySelector("#prueba-marca");
const campoPrecio = document.querySelector("#prueba-precio");
const campoImagen = document.querySelector("#prueba-imagen");
const campoDescripcion = document.querySelector("#prueba-descripcion");
const campoDestacado = document.querySelector("#prueba-destacado");
const mensaje = document.querySelector("#prueba-mensaje");
const lista = document.querySelector("#lista-productos");
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
        textoSesion.textContent = "Sin sesión. Inicia sesión en login.html para modificar productos.";
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

function crearBoton(texto, accion, producto) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = texto;
    boton.dataset.accion = accion;
    boton.dataset.id = producto.id;
    boton.dataset.nombre = producto.nombre;
    boton.dataset.marca = producto.marca;
    boton.dataset.precio = producto.precio;
    return boton;
}

function dibujarProductos(productos) {
    lista.innerHTML = "";

    productos.forEach(function (producto) {
        const item = document.createElement("li");
        item.classList.add("producto-item");

        let detalle = producto.nombre + " (" + producto.marca + ") - precio: " + producto.precio;
        if (producto.destacado) {
            detalle += " - destacado";
        }

        const texto = document.createElement("span");
        texto.textContent = detalle;

        const acciones = document.createElement("span");
        acciones.classList.add("producto-acciones");
        acciones.appendChild(crearBoton("Editar", "editar", producto));
        acciones.appendChild(crearBoton("Eliminar", "eliminar", producto));

        item.appendChild(texto);
        item.appendChild(acciones);
        lista.appendChild(item);
    });
}

async function cargarProductos() {
    try {
        const respuesta = await fetch(API);
        const productos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarMensaje(textoDeError(productos), true);
            return;
        }

        dibujarProductos(productos);
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

        mostrarMensaje(metodo === "DELETE" ? "Producto eliminado" : "Producto actualizado", false);
        cargarProductos();
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
        const seguro = confirm("¿Eliminar " + boton.dataset.nombre + "?");
        if (seguro) {
            enviarCambio(url, "DELETE");
        }
    }

    if (accion === "editar") {
        const nuevoNombre = prompt("Nuevo nombre:", boton.dataset.nombre);
        if (nuevoNombre === null) {
            return;
        }
        const nuevaMarca = prompt("Nueva marca:", boton.dataset.marca);
        if (nuevaMarca === null) {
            return;
        }
        const nuevoPrecio = prompt("Nuevo precio:", boton.dataset.precio);
        if (nuevoPrecio === null) {
            return;
        }

        if (nuevoPrecio.trim() === "" || isNaN(Number(nuevoPrecio))) {
            mostrarMensaje("El precio debe ser un número", true);
            return;
        }

        enviarCambio(url, "PATCH", {
            nombre: nuevoNombre,
            marca: nuevaMarca,
            precio: Number(nuevoPrecio)
        });
    }
});

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const respuesta = await fetch(API, {
            method: "POST",
            headers: cabeceras({ "Content-Type": "application/json" }),
            body: JSON.stringify({
                nombre: campoNombre.value,
                marca: campoMarca.value,
                precio: campoPrecio.value === "" ? undefined : Number(campoPrecio.value),
                imagen: campoImagen.value,
                descripcion: campoDescripcion.value,
                destacado: campoDestacado.checked
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarMensaje(textoDeError(datos), true);
            return;
        }

        mostrarMensaje("Producto creado: " + datos.nombre, false);
        formulario.reset();
        cargarProductos();
    } catch (error) {
        mostrarMensaje("No se pudo conectar con el servidor. ¿Está encendido?", true);
    }
});

mostrarSesion();
cargarProductos();