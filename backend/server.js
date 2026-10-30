require("dotenv").config();
const express = require("express");
const conectarBD = require("./config/db");
const productosRoutes = require("./routes/productos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const cors = require("cors");

const app = express();
const PUERTO = 4000;

app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
}));

app.use(express.json());

app.get("/", function (req, res) {
    res.send("Servidor de Royal Watches funcionando");
});

app.get("/api/salud", function (req, res) {
    res.json({ estado: "ok" });
});

app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);

conectarBD();

app.listen(PUERTO, function () {
    console.log("Servidor escuchando en http://localhost:" + PUERTO);
});