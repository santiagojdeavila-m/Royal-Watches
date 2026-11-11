const jwt = require("jsonwebtoken");

const EXPIRACION = "2h";

function obtenerSecreto() {
    const secreto = process.env.JWT_SECRET;

    if (!secreto) {
        throw new Error("Falta JWT_SECRET en el archivo .env");
    }

    return secreto;
}

function firmarToken(usuario) {
    return jwt.sign(
        { sub: usuario._id.toString() },
        obtenerSecreto(),
        { expiresIn: EXPIRACION, algorithm: "HS256" }
    );
}

function verificarToken(token) {
    return jwt.verify(token, obtenerSecreto(), { algorithms: ["HS256"] });
}

module.exports = { firmarToken, verificarToken };