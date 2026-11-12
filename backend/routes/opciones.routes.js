const express = require("express");
const autenticar = require("../middleware/autenticar");
const opcionesController = require("../controllers/opciones.controller");

const router = express.Router();

router.get("/", autenticar, opcionesController.obtenerOpciones);

module.exports = router;