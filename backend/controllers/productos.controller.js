const productos = require("../data/productos");

function obtenerProductos(req, res) {
    res.json(productos);
}

function obtenerProductoPorId(req, res) {
    const id = Number(req.params.id);

    const producto = productos.find(function (p) {
        return p.id === id;
    });

    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
}

module.exports = { obtenerProductos, obtenerProductoPorId };