import { API_URL, obtenerToken } from "./sesion";

export async function pedirRecomendacion(pregunta) {
    let respuesta;

    try {
        respuesta = await fetch(API_URL + "/api/ia/recomendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + obtenerToken()
            },
            body: JSON.stringify({ pregunta: pregunta })
        });
    } catch {
        throw new Error("No pudimos conectar con el servidor");
    }

    const datos = await respuesta.json().catch(function () { return {}; });

    if (!respuesta.ok) {
        const error = new Error(datos.mensaje || "No pudimos obtener la recomendación");
        error.estado = respuesta.status;
        throw error;
    }

    return datos.respuesta;
}