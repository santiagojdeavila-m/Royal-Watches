const productosModel = require("../models/producto.model");

function manejarError(error, res) {
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

module.exports = { obtenerProductos, obtenerProductoPorId };