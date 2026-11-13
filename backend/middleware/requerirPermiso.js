function requerirPermiso(permisoNecesario) {
  return function (req, res, next) {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "Debes iniciar sesión para acceder" });
    }
    const permisos = req.usuario.permisos || [];
    if (!permisos.includes(permisoNecesario)) {
      return res.status(403).json({ mensaje: "No tienes permiso para realizar esta acción" });
    }
    next();
  };
}
module.exports = requerirPermiso;