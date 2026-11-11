function requerirRol(...rolesPermitidos) {
    return function (req, res, next) {
        if (!req.usuario) {
            return res.status(401).json({ mensaje: "Debes iniciar sesión para acceder" });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: "No tienes permiso para realizar esta acción" });
        }

        next();
    };
}

module.exports = requerirRol;