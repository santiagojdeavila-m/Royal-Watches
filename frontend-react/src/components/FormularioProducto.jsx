import { useState } from "react";
import CampoFormulario from "./CampoFormulario";
import MensajeEstado from "./MensajeEstado";

function FormularioProducto({ producto, alGuardar, alCancelar }) {
    const [nombre, setNombre] = useState(producto ? producto.nombre : "");
    const [marca, setMarca] = useState(producto ? producto.marca : "");
    const [precio, setPrecio] = useState(producto ? String(producto.precio) : "");
    const [imagen, setImagen] = useState(producto ? producto.imagen : "");
    const [descripcion, setDescripcion] = useState(producto && producto.descripcion ? producto.descripcion : "");
    const [destacado, setDestacado] = useState(producto ? producto.destacado : false);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const [guardando, setGuardando] = useState(false);

    async function enviar(evento) {
        evento.preventDefault();
        setErrores({});
        setMensaje("");

        const nuevos = {};
        const numero = Number(precio);

        if (nombre.trim().length < 2 || nombre.trim().length > 100) {
            nuevos.nombre = "El nombre debe tener entre 2 y 100 caracteres";
        }
        if (marca.trim() === "") {
            nuevos.marca = "La marca es obligatoria";
        }
        if (precio.trim() === "" || !Number.isFinite(numero) || numero < 0) {
            nuevos.precio = "El precio debe ser un número mayor o igual a 0";
        }
        if (imagen.trim() === "") {
            nuevos.imagen = "La imagen es obligatoria";
        }
        if (descripcion.length > 500) {
            nuevos.descripcion = "La descripción no puede pasar de 500 caracteres";
        }

        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }

        setGuardando(true);

        try {
            await alGuardar({
                nombre: nombre.trim(),
                marca: marca.trim(),
                precio: numero,
                imagen: imagen.trim(),
                descripcion: descripcion.trim(),
                destacado: destacado
            });
        } catch (error) {
            const detalle = error.errores || {};

            if (Object.keys(detalle).length > 0) {
                setErrores(detalle);
            } else {
                setMensaje(error.message);
            }
        } finally {
            setGuardando(false);
        }
    }

    return (
        <form className="formulario formulario-ancho" onSubmit={enviar}>
            <CampoFormulario id="prod-nombre" etiqueta="Nombre" valor={nombre} alCambiar={setNombre} error={errores.nombre} />
            <CampoFormulario id="prod-marca" etiqueta="Marca" valor={marca} alCambiar={setMarca} error={errores.marca} />
            <CampoFormulario id="prod-precio" etiqueta="Precio" tipo="number" valor={precio} alCambiar={setPrecio} error={errores.precio} />
            <CampoFormulario id="prod-imagen" etiqueta="Ruta de la imagen" valor={imagen} alCambiar={setImagen} error={errores.imagen} />

            <div className="campo">
                <label htmlFor="prod-descripcion">Descripción</label>
                <textarea
                    id="prod-descripcion"
                    rows="3"
                    value={descripcion}
                    onChange={function (evento) { setDescripcion(evento.target.value); }}
                />
                {errores.descripcion && <p className="error">{errores.descripcion}</p>}
            </div>

            <label className="campo-check">
                <input
                    type="checkbox"
                    checked={destacado}
                    onChange={function (evento) { setDestacado(evento.target.checked); }}
                />
                Producto destacado
            </label>

            <MensajeEstado tipo="error" texto={mensaje} />

            <div className="modal-botones">
                <button type="button" className="boton-secundario" onClick={alCancelar} disabled={guardando}>
                    Cancelar
                </button>
                <button type="submit" disabled={guardando}>
                    {guardando ? "Guardando..." : producto ? "Guardar cambios" : "Crear producto"}
                </button>
            </div>
        </form>
    );
}

export default FormularioProducto;