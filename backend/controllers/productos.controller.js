const productosModel = require("../models/producto.model");

const CAMPOS = ["nombre", "marca", "precio", "imagen", "descripcion", "destacado"];

function extraerCampos(cuerpo) {
    const datos = {};
    CAMPOS.forEach(function (campo) {
        if (cuerpo[campo] !== undefined) {
            datos[campo] = cuerpo[campo];
        }
    });
    return datos;
}

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
        return res.status(409).json({ mensaje: "Ya existe un producto con ese nombre" });
    }

    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
}

async function obtenerProductos(req, res) {
    try {
        const productos = await productosModel.listarProductos();
        res.json(productos);
    } catch (error) {
        manejarError(error, res);
    }
}

async function obtenerProductoPorId(req, res) {
    try {
        const producto = await productosModel.obtenerProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        manejarError(error, res);
    }
}

async function crearProducto(req, res) {
    try {
        const datos = extraerCampos(req.body || {});
        const producto = await productosModel.crearProducto(datos);
        res.status(201).json(producto);
    } catch (error) {
        manejarError(error, res);
    }
}

async function actualizarProducto(req, res) {
    try {
        const cambios = extraerCampos(req.body || {});

        if (Object.keys(cambios).length === 0) {
            return res.status(400).json({ mensaje: "No hay datos para actualizar" });
        }

        const producto = await productosModel.actualizarProducto(req.params.id, cambios);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        manejarError(error, res);
    }
}

async function eliminarProducto(req, res) {
    try {
        const producto = await productosModel.eliminarProducto(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        manejarError(error, res);
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};