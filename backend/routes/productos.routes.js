const express = require("express");
const productosController = require("../controllers/productos.controller");
const autenticar = require("../middleware/autenticar");
const requerirRol = require("../middleware/requerirRol");

const router = express.Router();

router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductoPorId);
router.post("/", autenticar, requerirRol("admin"), productosController.crearProducto);
router.patch("/:id", autenticar, requerirRol("admin"), productosController.actualizarProducto);
router.delete("/:id", autenticar, requerirRol("admin"), productosController.eliminarProducto);

module.exports = router;