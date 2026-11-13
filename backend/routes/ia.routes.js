const express = require("express");
const iaController = require("../controllers/ia.controller");
const autenticar = require("../middleware/autenticar");
const { crearLimitador } = require("../middleware/limitadores");

const router = express.Router();

const limitadorIA = crearLimitador({
    mensaje: "Hiciste muchas preguntas seguidas. Espera unos minutos e inténtalo de nuevo"
});

router.post("/recomendar", limitadorIA, autenticar, iaController.recomendar);

module.exports = router;