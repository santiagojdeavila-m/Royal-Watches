const usuariosModel = require("../models/usuario.model");
const { verificarToken } = require("../utils/token");
const { obtenerPermisos } = require("../utils/permisos");

async function autenticar(req, res, next) {
  try {
    const cabecera = req.headers.authorization || "";
    const partes = cabecera.split(" ");
    const tipo = partes[0];
    const token = partes[1];

    if (tipo !== "Bearer" || !token) {
      return res.status(401).json({ mensaje: "Debes iniciar sesión para acceder" });
    }

    let contenido;

    try {
      contenido = verificarToken(token);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ mensaje: "Tu sesión venció. Inicia sesión de nuevo" });
      }
      if (error.name === "JsonWebTokenError" || error.name === "NotBeforeError") {
        return res.status(401).json({ mensaje: "Sesión inválida. Inicia sesión de nuevo" });
      }
      throw error;
    }

    const usuario = await usuariosModel.obtenerUsuarioPorId(contenido.sub);

    if (!usuario) {
      return res.status(401).json({ mensaje: "Sesión inválida. Inicia sesión de nuevo" });
    }

    req.usuario = usuario;
    req.usuario.permisos = obtenerPermisos(usuario.rol);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

module.exports = autenticar;