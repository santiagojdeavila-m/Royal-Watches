import { useState } from "react";
import CampoFormulario from "./CampoFormulario";
import MensajeEstado from "./MensajeEstado";
import { cambiarPassword } from "../api";

function FormularioPassword() {
    const [actual, setActual] = useState("");
    const [nueva, setNueva] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

    async function enviar(evento) {
        evento.preventDefault();
        setErrores({});
        setMensaje({ tipo: "", texto: "" });

        const nuevos = {};

        if (actual === "") {
            nuevos.passwordActual = "Escribe tu contraseña actual";
        }
        if (nueva.length < 8) {
            nuevos.passwordNueva = "La contraseña debe tener al menos 8 caracteres";
        }
        if (confirmar !== nueva) {
            nuevos.confirmar = "Las contraseñas no coinciden";
        }

        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }

        setEnviando(true);

        try {
            await cambiarPassword({ passwordActual: actual, passwordNueva: nueva });
            setActual("");
            setNueva("");
            setConfirmar("");
            setMensaje({ tipo: "exito", texto: "Contraseña actualizada" });
        } catch (error) {
            const detalle = error.errores || {};

            if (Object.keys(detalle).length > 0) {
                setErrores(detalle);
            } else {
                setMensaje({ tipo: "error", texto: error.message });
            }
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form className="formulario" onSubmit={enviar}>
            <CampoFormulario id="pw-actual" etiqueta="Contraseña actual" tipo="password" valor={actual} alCambiar={setActual} error={errores.passwordActual} />
            <CampoFormulario id="pw-nueva" etiqueta="Contraseña nueva" tipo="password" valor={nueva} alCambiar={setNueva} error={errores.passwordNueva} />
            <CampoFormulario id="pw-confirmar" etiqueta="Confirmar contraseña nueva" tipo="password" valor={confirmar} alCambiar={setConfirmar} error={errores.confirmar} />

            <MensajeEstado tipo={mensaje.tipo} texto={mensaje.texto} />

            <button type="submit" disabled={enviando}>
                {enviando ? "Guardando..." : "Cambiar contraseña"}
            </button>
        </form>
    );
}

export default FormularioPassword;