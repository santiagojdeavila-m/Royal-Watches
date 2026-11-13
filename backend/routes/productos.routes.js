const express = require("express");
const productosController = require("../controllers/productos.controller");
const autenticar = require("../middleware/autenticar");
const requerirPermiso = require("../middleware/requerirPermiso");

const router = express.Router();

router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductoPorId);
router.post("/", autenticar, requerirPermiso("productos:crear"), productosController.crearProducto);
router.patch("/:id", autenticar, requerirPermiso("productos:editar"), productosController.actualizarProducto);
router.delete("/:id", autenticar, requerirPermiso("productos:eliminar"), productosController.eliminarProducto);

module.exports = router;