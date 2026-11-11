const express = require("express");
const authController = require("../controllers/auth.controller");
const autenticar = require("../middleware/autenticar");

const router = express.Router();

router.post("/registro", authController.registrar);
router.post("/login", authController.iniciarSesion);
router.get("/yo", autenticar, authController.perfil);

module.exports = router;