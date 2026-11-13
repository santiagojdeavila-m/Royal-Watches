const express = require("express");
const autenticar = require("../middleware/autenticar");
const perfilController = require("../controllers/perfil.controller");

const router = express.Router();

router.use(autenticar);

router.get("/", perfilController.obtenerPerfil);
router.patch("/", perfilController.actualizarPerfil);
router.patch("/password", perfilController.cambiarPassword);

module.exports = router;