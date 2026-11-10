const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/registro", authController.registrar);
router.post("/login", authController.iniciarSesion);

module.exports = router;