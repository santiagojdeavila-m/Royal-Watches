const PASSWORDS_COMUNES = [
    "12345678", "123456789", "1234567890", "11111111", "00000000",
    "12341234", "87654321", "123123123", "password", "password1",
    "password123", "qwerty123", "qwertyuiop", "abc12345", "contraseña",
    "contrasena", "iloveyou", "admin123", "letmein1", "welcome1"
];

const LARGO_MINIMO_PARTE_CORREO = 4;

function evaluarPassword(password, correo) {
    const passwordMinuscula = password.toLowerCase();

    if (PASSWORDS_COMUNES.includes(passwordMinuscula)) {
        return "Esa contraseña es demasiado común. Elige otra";
    }

    const parteCorreo = typeof correo === "string"
        ? correo.trim().toLowerCase().split("@")[0]
        : "";

    if (parteCorreo.length >= LARGO_MINIMO_PARTE_CORREO && passwordMinuscula.includes(parteCorreo)) {
        return "La contraseña no puede incluir tu correo";
    }

    return null;
}

module.exports = { evaluarPassword };