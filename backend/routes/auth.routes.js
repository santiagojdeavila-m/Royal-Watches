const express = require("express");
const authController = require("../controllers/auth.controller");
const autenticar = require("../middleware/autenticar");
const { crearLimitador } = require("../middleware/limitadores");

const router = express.Router();

const limitadorRegistro = crearLimitador({
    mensaje: "Demasiados intentos de registro. Espera unos minutos e inténtalo de nuevo"
});

const limitadorLogin = crearLimitador({
    maximo: 20,
    mensaje: "Demasiados intentos de inicio de sesión. Espera unos minutos e inténtalo de nuevo"
});

router.post("/registro", limitadorRegistro, authController.registrar);
router.post("/login", limitadorLogin, authController.iniciarSesion);
router.get("/yo", autenticar, authController.perfil);

module.exports = router;