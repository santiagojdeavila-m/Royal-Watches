const express = require("express");
const usuariosController = require("../controllers/usuarios.controller");
const autenticar = require("../middleware/autenticar");
const requerirRol = require("../middleware/requerirRol");

const router = express.Router();

router.use(autenticar, requerirRol("admin"));

router.get("/", usuariosController.listarUsuarios);
router.get("/:id", usuariosController.obtenerUsuario);
router.patch("/:id", usuariosController.actualizarUsuario);
router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;