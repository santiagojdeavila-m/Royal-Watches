import { useState } from "react";
import { API_URL, guardarSesion } from "../sesion";

function FormularioLogin({ alIniciarSesion }) {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    async function enviar(evento) {
        evento.preventDefault();
        setError("");

        if (correo.trim() === "" || password === "") {
            setError("Escribe tu correo y tu contraseña");
            return;
        }

        setEnviando(true);

        try {
            const respuesta = await fetch(API_URL + "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: correo.trim(), password: password })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(datos.mensaje || "No se pudo iniciar sesión");
                return;
            }

            guardarSesion(datos.token, datos.usuario);
            alIniciarSesion();
        } catch {
            setError("No pudimos conectar con el servidor");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form className="formulario" onSubmit={enviar}>
            <label htmlFor="correo">Correo electrónico</label>
            <input
                id="correo"
                type="email"
                value={correo}
                onChange={function (evento) { setCorreo(evento.target.value); }}
            />

            <label htmlFor="password">Contraseña</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={function (evento) { setPassword(evento.target.value); }}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={enviando}>
                {enviando ? "Ingresando..." : "Ingresar"}
            </button>
        </form>
    );
}

export default FormularioLogin;