require("dotenv").config();
const mongoose = require("mongoose");
const conectarBD = require("../config/db");
const productosModel = require("../models/producto.model");
const productosBase = require("../data/productos");

async function sembrar() {
    try {
        await conectarBD();

        const lista = productosBase.map(function (producto) {
            const { id, ...datos } = producto;
            return datos;
        });

        await productosModel.sembrarProductos(lista);
        console.log("Productos cargados: " + lista.length);
    } catch (error) {
        console.error("Falló la carga:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

sembrar();