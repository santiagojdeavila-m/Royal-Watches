const rateLimit = require("express-rate-limit");

function crearLimitador(opciones) {
    const config = opciones || {};

    return rateLimit({
        windowMs: config.ventanaMs || 15 * 60 * 1000, 
        limit: config.maximo || 10,                   
        standardHeaders: "draft-7",
        legacyHeaders: false,
        handler: function (req, res) {
            res.status(429).json({
                mensaje: config.mensaje || "Demasiadas peticiones. Inténtalo de nuevo más tarde"
            });
        }
    });
}

module.exports = { crearLimitador };