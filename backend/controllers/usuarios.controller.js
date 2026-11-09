const usuariosModel = require("../models/usuario.model");

function manejarError(error, res) {
    if (error.name === "ValidationError") {
        const mensajes = Object.values(error.errors).map(function (e) {
            return e.message;
        });
        return res.status(400).json({ mensaje: "Datos inválidos", errores: mensajes });
    }

    if (error.name === "CastError") {
        return res.status(400).json({ mensaje: "Algún dato tiene un formato inválido" });
    }

    if (error.code === 11000) {
        return res.status(409).json({ mensaje: "Ese correo ya está registrado" });
    }

    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
}

async function crearUsuario(req, res) {
    try {
        const cuerpo = req.body || {};
        const usuario = await usuariosModel.crearUsuario({
            nombre: cuerpo.nombre,
            correo: cuerpo.correo
        });
        res.status(201).json(usuario);
    } catch (error) {
        manejarError(error, res);
    }
}

async function listarUsuarios(req, res) {
    try {
        const filtro = {};
        const rol = req.query.rol;

        if (rol !== undefined) {
            if (!usuariosModel.ROLES.includes(rol)) {
                return res.status(400).json({ mensaje: "El rol debe ser cliente o admin" });
            }
            filtro.rol = rol;
        }

        const usuarios = await usuariosModel.listarUsuarios(filtro);
        res.json(usuarios);
    } catch (error) {
        manejarError(error, res);
    }
}

async function obtenerUsuario(req, res) {
    try {
        const usuario = await usuariosModel.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        manejarError(error, res);
    }
}

async function actualizarUsuario(req, res) {
    try {
        const cuerpo = req.body || {};
        const cambios = {};

        if (cuerpo.nombre !== undefined) {
            cambios.nombre = cuerpo.nombre;
        }
        if (cuerpo.correo !== undefined) {
            cambios.correo = cuerpo.correo;
        }

        if (Object.keys(cambios).length === 0) {
            return res.status(400).json({ mensaje: "No hay datos para actualizar" });
        }

        const usuario = await usuariosModel.actualizarUsuario(req.params.id, cambios);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        manejarError(error, res);
    }
}

async function eliminarUsuario(req, res) {
    try {
        const usuario = await usuariosModel.eliminarUsuario(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        manejarError(error, res);
    }
}

module.exports = {
    crearUsuario,
    listarUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
};