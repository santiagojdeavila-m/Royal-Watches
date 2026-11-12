require("dotenv").config();
const express = require("express");
const conectarBD = require("./config/db");
const productosRoutes = require("./routes/productos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();
const PUERTO = 4000;

app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
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
app.use("/api/auth", authRoutes);

app.use(function (req, res) {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.use(function (error, req, res, next) {
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ mensaje: "El cuerpo de la petición no es un JSON válido" });
    }
    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
});

async function iniciarServidor() {
    try {
        await conectarBD();

        app.listen(PUERTO, function () {
            console.log("Servidor escuchando en http://localhost:" + PUERTO);
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
}

iniciarServidor();