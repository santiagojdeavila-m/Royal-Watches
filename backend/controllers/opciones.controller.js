const OPCIONES_POR_ROL = require("../data/opcionesPorRol");

function obtenerOpciones(req, res) {
    const rol = req.usuario.rol;
    const opciones = OPCIONES_POR_ROL[rol];

    if (!opciones) {
        return res.status(403).json({ mensaje: "Tu rol no tiene opciones asignadas" });
    }

    res.json({ rol: rol, opciones: opciones });
}

module.exports = { obtenerOpciones };