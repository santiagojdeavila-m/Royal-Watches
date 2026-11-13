const productosModel = require("../models/producto.model");

const CAMPOS = ["nombre", "marca", "precio", "imagen", "descripcion", "destacado"];

function extraerCampos(cuerpo) {
    const datos = {};
    CAMPOS.forEach(function (campo) {
        if (cuerpo[campo] !== undefined) {
            datos[campo] = cuerpo[campo];
        }
    });
    return datos;
}

function validarProducto(datos, esCreacion) {
    const errores = {};

    function presente(campo) {
        return esCreacion || datos[campo] !== undefined;
    }

    if (presente("nombre")) {
        if (typeof datos.nombre !== "string" || datos.nombre.trim().length < 2 || datos.nombre.trim().length > 100) {
            errores.nombre = "El nombre debe tener entre 2 y 100 caracteres";
        }
    }

    if (presente("marca")) {
        if (typeof datos.marca !== "string" || datos.marca.trim() === "") {
            errores.marca = "La marca es obligatoria";
        }
    }

    if (presente("precio")) {
        if (typeof datos.precio !== "number" || !Number.isFinite(datos.precio) || datos.precio < 0) {
            errores.precio = "El precio debe ser un número mayor o igual a 0";
        }
    }

    if (presente("imagen")) {
        if (typeof datos.imagen !== "string" || datos.imagen.trim() === "") {
            errores.imagen = "La imagen es obligatoria";
        }
    }

    if (datos.descripcion !== undefined) {
        if (typeof datos.descripcion !== "string" || datos.descripcion.length > 500) {
            errores.descripcion = "La descripción no puede pasar de 500 caracteres";
        }
    }

    if (datos.destacado !== undefined && typeof datos.destacado !== "boolean") {
        errores.destacado = "Destacado debe ser verdadero o falso";
    }

    return errores;
}

function manejarError(error, res) {
    if (error.name === "ValidationError") {
        const errores = {};
        Object.keys(error.errors).forEach(function (campo) {
            errores[campo] = error.errors[campo].message;
        });
        return res.status(400).json({ mensaje: "Datos inválidos", errores: errores });
    }

    if (error.name === "CastError") {
        return res.status(400).json({ mensaje: "Algún dato tiene un formato inválido" });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            mensaje: "Ya existe un producto con ese nombre",
            errores: { nombre: "Ya existe un producto con ese nombre" }
        });
    }

    console.error(error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
}

async function obtenerProductos(req, res) {
    try {
        const productos = await productosModel.listarProductos();
        res.json(productos);
    } catch (error) {
        manejarError(error, res);
    }
}

async function obtenerProductoPorId(req, res) {
    try {
        const producto = await productosModel.obtenerProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        manejarError(error, res);
    }
}

async function crearProducto(req, res) {
    try {
        const datos = extraerCampos(req.body || {});
        const errores = validarProducto(datos, true);

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: errores });
        }

        const producto = await productosModel.crearProducto(datos);
        res.status(201).json(producto);
    } catch (error) {
        manejarError(error, res);
    }
}

async function actualizarProducto(req, res) {
    try {
        const cambios = extraerCampos(req.body || {});

        if (Object.keys(cambios).length === 0) {
            return res.status(400).json({ mensaje: "No hay datos para actualizar" });
        }

        const errores = validarProducto(cambios, false);

        if (Object.keys(errores).length > 0) {
            return res.status(400).json({ mensaje: "Datos inválidos", errores: errores });
        }

        const producto = await productosModel.actualizarProducto(req.params.id, cambios);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        manejarError(error, res);
    }
}

async function eliminarProducto(req, res) {
    try {
        const producto = await productosModel.eliminarProducto(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        manejarError(error, res);
    }
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};