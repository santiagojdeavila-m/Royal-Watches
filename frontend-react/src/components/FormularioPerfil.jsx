import { useState, useEffect } from "react";
import CampoFormulario from "./CampoFormulario";
import MensajeEstado from "./MensajeEstado";
import Cargando from "./Cargando";
import { pedirPerfil, guardarPerfil } from "../api";
import { obtenerToken, guardarSesion } from "../sesion";

const REGEX_CORREO = /^\S+@\S+\.\S+$/;

function FormularioPerfil({ alActualizarUsuario }) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

    useEffect(function () {
        let vigente = true;

        pedirPerfil()
            .then(function (usuario) {
                if (!vigente) {
                    return;
                }
                setNombre(usuario.nombre);
                setCorreo(usuario.correo);
                setCargando(false);
            })
            .catch(function () {
                if (!vigente) {
                    return;
                }
                setMensaje({ tipo: "error", texto: "No pudimos cargar tu perfil" });
                setCargando(false);
            });

        return function () {
            vigente = false;
        };
    }, []);

    async function enviar(evento) {
        evento.preventDefault();
        setErrores({});
        setMensaje({ tipo: "", texto: "" });

        const nuevos = {};

        if (nombre.trim().length < 2) {
            nuevos.nombre = "El nombre debe tener al menos 2 caracteres";
        }
        if (!REGEX_CORREO.test(correo.trim())) {
            nuevos.correo = "Escribe un correo válido";
        }

        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }

        setGuardando(true);

        try {
            const usuario = await guardarPerfil({ nombre: nombre.trim(), correo: correo.trim() });

            guardarSesion(obtenerToken(), usuario);
            alActualizarUsuario();
            setMensaje({ tipo: "exito", texto: "Perfil actualizado" });
        } catch (error) {
            const detalle = error.errores || {};

            if (Object.keys(detalle).length > 0) {
                setErrores(detalle);
            } else {
                setMensaje({ tipo: "error", texto: error.message });
            }
        } finally {
            setGuardando(false);
        }
    }

    if (cargando) {
        return <Cargando />;
    }

    return (
        <form className="formulario" onSubmit={enviar}>
            <CampoFormulario id="perfil-nombre" etiqueta="Nombre completo" valor={nombre} alCambiar={setNombre} error={errores.nombre} />
            <CampoFormulario id="perfil-correo" etiqueta="Correo electrónico" tipo="email" valor={correo} alCambiar={setCorreo} error={errores.correo} />

            <MensajeEstado tipo={mensaje.tipo} texto={mensaje.texto} />

            <button type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
        </form>
    );
}

export default FormularioPerfil;