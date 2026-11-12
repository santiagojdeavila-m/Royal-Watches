export const API_URL = "http://localhost:4000";

const CLAVE_SESION = "sesion";

function decodificarToken(token) {
    try {
        const cuerpo = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(cuerpo));
    } catch {
        return null;
    }
}

export function guardarSesion(token, usuario) {
    try {
        localStorage.setItem(CLAVE_SESION, JSON.stringify({
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        }));
    } catch {
        console.error("No se pudo guardar la sesión");
    }
}

export function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

export function obtenerSesion() {
    const texto = localStorage.getItem(CLAVE_SESION);

    if (!texto) {
        return null;
    }

    try {
        const sesion = JSON.parse(texto);
        const contenido = decodificarToken(sesion.token);

        if (!contenido || contenido.exp * 1000 <= Date.now()) {
            cerrarSesion();
            return null;
        }

        return sesion;
    } catch {
        cerrarSesion();
        return null;
    }
}