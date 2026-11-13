const usuariosModel = require("../models/usuario.model");
const { hashearPassword, compararPassword } = require("../utils/password");
const { evaluarPassword } = require("../utils/passwordRules");

const PASSWORD_MINIMO = 8;
const PASSWORD_MAXIMO_BYTES = 72;

function obtenerPerfil(req, res) {
    res.json(req.usuario);
}

function erroresDeValidacion(error) {
    const errores = {};
    Object.keys(error.errors).forEach(function (campo) {
        errores[campo] = error.errors[campo].message;
    });
    return errores;
}

async function actualizarPerfil(req, res) {
    try {
        const cuerpo = req.body || {};
        const cambios = {};

        if (typeof cuerpo.nombre === "string") {
            cambios.nombre = cuerpo.nombre;
        }
        if (typeof cuerpo.correo === "string") {
            cambios.correo = cuerpo.correo;
        }

        if (Object.keys(cambios).length === 0) {
            return res.status(400).json({ mensaje: "No hay datos para actualizar" });
        }

        const usuario = await usuariosModel.actualizarUsuario(req.usuario.id, cambios);

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: erroresDeValidacion(error) });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "Ese correo ya está registrado",
                errores: { correo: "Ese correo ya está registrado" }
            });
        }

        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

async function cambiarPassword(req, res) {
    try {
        const cuerpo = req.body || {};
        const actual = cuerpo.passwordActual;
        const nueva = cuerpo.passwordNueva;
        const errores = {};

        if (typeof actual !== "string" || actual === "") {
            errores.passwordActual = "Escribe tu contraseña actual";
        }

        if (typeof nueva !== "string" || nueva === "") {
            errores.passwordNueva = "La contraseña nueva es obligatoria";
        } else if (nueva.length < PASSWORD_MINIMO) {
            errores.passwordNueva = "La contraseña debe tener al menos 8 caracteres";
        } else if (Buffer.byteLength(nueva, "utf8") > PASSWORD_MAXIMO_BYTES) {
            errores.passwordNueva = "La contraseña es demasiado larga";
        } else if (nueva === actual) {
            errores.passwordNueva = "La contraseña nueva debe ser distinta de la actual";
        } else {
            const problema = evaluarPassword(nueva, req.usuario.correo);

            if (problema) {
                errores.passwordNueva = problema;
            }
        }

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: errores });
        }

        // Se pide el hash aparte porque el modelo lo oculta (select:false)
        const conHash = await usuariosModel.obtenerUsuarioParaLogin(req.usuario.correo);
        const coincide = conHash && conHash.passwordHash
            ? await compararPassword(actual, conHash.passwordHash)
            : false;

        if (!coincide) {
            return res.status(400).json({
                mensaje: "Datos inválidos",
                errores: { passwordActual: "La contraseña actual no es correcta" }
            });
        }

        const nuevoHash = await hashearPassword(nueva);
        await usuariosModel.actualizarUsuario(req.usuario.id, { passwordHash: nuevoHash });

        res.json({ mensaje: "Contraseña actualizada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

module.exports = { obtenerPerfil, actualizarPerfil, cambiarPassword };