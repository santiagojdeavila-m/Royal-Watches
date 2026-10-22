const express = require("express");
const productosController = require("../controllers/productos.controller");

const router = express.Router();

router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductoPorId);

module.exports = router;