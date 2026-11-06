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
        timestamps: true,
        toJSON: {
            versionKey: false,
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                return ret;
            }
        }
    }
);

const Producto = mongoose.model("Producto", productoSchema, "productos");

async function listarProductos() {
    return Producto.find().sort({ _id: 1 });
}

async function obtenerProductoPorId(id) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }
    return Producto.findById(id);
}

async function sembrarProductos(lista) {
    for (const datos of lista) {
        await Producto.findOneAndUpdate(
            { nombre: datos.nombre },
            datos,
            { upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
    }
}

async function crearProducto(datos) {
    return Producto.create(datos);
}

async function actualizarProducto(id, cambios) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }
    return Producto.findByIdAndUpdate(id, cambios, { new: true, runValidators: true });
}

async function eliminarProducto(id) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }
    return Producto.findByIdAndDelete(id);
}

module.exports = {
    listarProductos,
    obtenerProductoPorId,
    sembrarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};