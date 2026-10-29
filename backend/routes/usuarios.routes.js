const express = require("express");
const usuariosController = require("../controllers/usuarios.controller");

const router = express.Router();

router.post("/", usuariosController.crearUsuario);
router.get("/", usuariosController.listarUsuarios);
router.get("/:id", usuariosController.obtenerUsuario);
router.patch("/:id", usuariosController.actualizarUsuario);
router.delete("/:id", usuariosController.eliminarUsuario);

module.exports = router;