import { API_URL } from "./sesion";

export async function pedirOpciones(token) {
    const respuesta = await fetch(API_URL + "/api/opciones", {
        headers: { Authorization: "Bearer " + token }
    });

    if (!respuesta.ok) {
        const error = new Error("No se pudieron cargar las opciones");
        error.estado = respuesta.status;
        throw error;
    }

    const datos = await respuesta.json();
    return datos.opciones;
}