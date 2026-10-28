const mongoose = require("mongoose");

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
                values: ["cliente", "admin"],
                message: "El rol debe ser cliente o admin"
            },
            default: "cliente"
        },
        passwordHash: {
            type: String,
            select: false
        }
    },
    { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");

module.exports = Usuario;