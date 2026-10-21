// TEMPORAL: José reemplaza el cuerpo de estas funciones con la lógica real.
// Los nombres de las funciones son el contrato y no deben cambiar.

function obtenerProductos(req, res) {
    res.json({ mensaje: "pendiente: lista de productos" });
}

function obtenerProductoPorId(req, res) {
    res.json({ mensaje: "pendiente: producto " + req.params.id });
}

module.exports = { obtenerProductos, obtenerProductoPorId };