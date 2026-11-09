const mongoose = require("mongoose");

const ROLES = ["cliente", "admin"];

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            minlength: [2, "El nombre debe tener al menos 2 caracteres"],
            maxlength: [80, "El nombre no puede pasar de 80 caracteres"]
        },
        correo: {
            type: String,
            required: [true, "El correo es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "El correo no tiene un formato válido"]
        },
        rol: {
            type: String,
            enum: {
                values: ROLES,
                message: "El rol debe ser cliente o admin"
            },
            default: "cliente"
        },
        passwordHash: {
            type: String,
            select: false
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

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");

async function crearUsuario(datos) {
    return Usuario.create(datos);
}

async function listarUsuarios(filtro = {}) {
    return Usuario.find(filtro).sort({ createdAt: -1 });
}

async function obtenerUsuarioPorId(id) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }
    return Usuario.findById(id);
}

async function actualizarUsuario(id, cambios) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }
    return Usuario.findByIdAndUpdate(id, cambios, { returnDocument: 'after', runValidators: true });
}

async function eliminarUsuario(id) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }
    return Usuario.findByIdAndDelete(id);
}

module.exports = {
    ROLES,
    crearUsuario,
    listarUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};