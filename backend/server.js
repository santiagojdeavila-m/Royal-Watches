require("dotenv").config();
const express = require("express");
const conectarBD = require("./config/db");
const productosRoutes = require("./routes/productos.routes");

const app = express();
const PUERTO = 4000;

app.get("/", function (req, res) {
    res.send("Servidor de Royal Watches funcionando");
});

app.get("/api/salud", function (req, res) {
    res.json({ estado: "ok" });
});

app.use("/api/productos", productosRoutes);

conectarBD();

app.listen(PUERTO, function () {
    console.log("Servidor escuchando en http://localhost:" + PUERTO);
});