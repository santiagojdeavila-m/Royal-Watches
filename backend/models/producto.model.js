const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            unique: true
        },
        marca: {
            type: String,
            required: [true, "La marca es obligatoria"],
            trim: true
        },
        precio: {
            type: Number,
            required: [true, "El precio es obligatorio"],
            min: [0, "El precio no puede ser negativo"]
        },
        imagen: {
            type: String,
            required: [true, "La imagen es obligatoria"],
            trim: true
        },
        descripcion: {
            type: String,
            trim: true
        },
        destacado: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: "productos",
        timestamps: { createdAt: "creadoEn", updatedAt: "actualizadoEn" }
    }
);

module.exports = mongoose.model("Producto", productoSchema);