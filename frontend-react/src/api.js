import { API_URL, obtenerToken } from "./sesion";

async function llamar(ruta, metodo, cuerpo) {
    const opciones = {
        method: metodo,
        headers: { Authorization: "Bearer " + obtenerToken() }
    };

    if (cuerpo) {
        opciones.headers["Content-Type"] = "application/json";
        opciones.body = JSON.stringify(cuerpo);
    }

    const respuesta = await fetch(API_URL + ruta, opciones);
    const datos = await respuesta.json().catch(function () {
        return {};
    });

    if (!respuesta.ok) {
        const error = new Error(datos.mensaje || "Error en la petición");
        error.estado = respuesta.status;
        error.errores = datos.errores || {};
        throw error;
    }

    return datos;
}

export function pedirOpciones() {
    return llamar("/api/opciones", "GET");
}

export function pedirProductos() {
    return llamar("/api/productos", "GET");
}

export function crearProducto(datos) {
    return llamar("/api/productos", "POST", datos);
}

export function editarProducto(id, datos) {
    return llamar("/api/productos/" + id, "PATCH", datos);
}

export function eliminarProducto(id) {
    return llamar("/api/productos/" + id, "DELETE");
}

export function pedirPerfil() {
    return llamar("/api/perfil", "GET");
}

export function guardarPerfil(datos) {
    return llamar("/api/perfil", "PATCH", datos);
}

export function cambiarPassword(datos) {
    return llamar("/api/perfil/password", "PATCH", datos);
}