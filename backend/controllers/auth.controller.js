const usuariosModel = require("../models/usuario.model");
const { hashearPassword } = require("../utils/password");
const { evaluarPassword } = require("../utils/passwordRules"); 

const REGEX_CORREO = /^\S+@\S+\.\S+$/;
const PASSWORD_MINIMO = 8;
const PASSWORD_MAXIMO_BYTES = 72;

function validarRegistro(nombre, correo, password) {
    const errores = {};

    if (typeof nombre !== "string" || nombre.trim() === "") {
        errores.nombre = "El nombre es obligatorio";
    } else if (nombre.trim().length < 2 || nombre.trim().length > 80) {
        errores.nombre = "El nombre debe tener entre 2 y 80 caracteres";
    }

    if (typeof correo !== "string" || correo.trim() === "") {
        errores.correo = "El correo es obligatorio";
    } else if (!REGEX_CORREO.test(correo.trim())) {
        errores.correo = "Escribe un correo válido";
    }

    if (typeof password !== "string" || password === "") {
        errores.password = "La contraseña es obligatoria";
    } else if (password.length < PASSWORD_MINIMO) {
        errores.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (Buffer.byteLength(password, "utf8") > PASSWORD_MAXIMO_BYTES) {
        errores.password = "La contraseña es demasiado larga";
    } else {
        const problema = evaluarPassword(password, correo);

        if (problema) {
            errores.password = problema;
        }
    }

    return errores;
}

async function registrar(req, res) {
    try {
        const cuerpo = req.body || {};

        const errores = validarRegistro(cuerpo.nombre, cuerpo.correo, cuerpo.password);

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: errores });
        }

        const passwordHash = await hashearPassword(cuerpo.password);

        const usuario = await usuariosModel.crearUsuario({
            nombre: cuerpo.nombre,
            correo: cuerpo.correo,
            passwordHash: passwordHash
        });

        res.status(201).json(usuario);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ mensaje: "Datos inválidos" });
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

module.exports = { registrar };