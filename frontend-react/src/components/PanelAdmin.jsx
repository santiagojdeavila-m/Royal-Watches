import { useState, useEffect } from "react";
import TablaDatos from "./TablaDatos";
import FormularioProducto from "./FormularioProducto";
import VentanaConfirmacion from "./VentanaConfirmacion";
import MensajeEstado from "./MensajeEstado";
import Cargando from "./Cargando";
import { pedirProductos, crearProducto, editarProducto, eliminarProducto } from "../api";

const COLUMNAS = [
    { clave: "nombre", titulo: "Nombre" },
    { clave: "marca", titulo: "Marca" },
    {
        clave: "precio",
        titulo: "Precio",
        formato: function (valor) { return "$" + valor.toLocaleString("es-CO"); }
    },
    {
        clave: "destacado",
        titulo: "Destacado",
        formato: function (valor) { return valor ? "Sí" : "No"; }
    }
];

function PanelAdmin({ permisos }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState("");
    const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
    const [modo, setModo] = useState("lista");
    const [seleccionado, setSeleccionado] = useState(null);
    const [porEliminar, setPorEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    const puedeCrear = permisos.includes("productos:crear");
    const puedeEditar = permisos.includes("productos:editar");
    const puedeEliminar = permisos.includes("productos:eliminar");

    useEffect(function () {
        let vigente = true;

        pedirProductos()
            .then(function (lista) {
                if (vigente) {
                    setProductos(lista);
                    setCargando(false);
                }
            })
            .catch(function () {
                if (vigente) {
                    setErrorCarga("No pudimos cargar los productos");
                    setCargando(false);
                }
            });

        return function () {
            vigente = false;
        };
    }, []);

    async function guardar(datos) {
        if (modo === "crear") {
            const nuevo = await crearProducto(datos);
            setProductos(productos.concat([nuevo]));
            setMensaje({ tipo: "exito", texto: "Producto creado" });
        } else {
            const actualizado = await editarProducto(seleccionado.id, datos);
            setProductos(productos.map(function (p) {
                return p.id === actualizado.id ? actualizado : p;
            }));
            setMensaje({ tipo: "exito", texto: "Producto actualizado" });
        }

        setModo("lista");
        setSeleccionado(null);
    }

    async function confirmarEliminar() {
        setEliminando(true);

        try {
            await eliminarProducto(porEliminar.id);
            setProductos(productos.filter(function (p) {
                return p.id !== porEliminar.id;
            }));
            setMensaje({ tipo: "exito", texto: "Producto eliminado" });
        } catch (error) {
            setMensaje({ tipo: "error", texto: error.message });
        } finally {
            setEliminando(false);
            setPorEliminar(null);
        }
    }

    function abrirCrear() {
        setMensaje({ tipo: "", texto: "" });
        setSeleccionado(null);
        setModo("crear");
    }

    function abrirEditar(producto) {
        setMensaje({ tipo: "", texto: "" });
        setSeleccionado(producto);
        setModo("editar");
    }

    function cancelar() {
        setModo("lista");
        setSeleccionado(null);
    }

    function renderAcciones(producto) {
        return (
            <>
                {puedeEditar && (
                    <button type="button" onClick={function () { abrirEditar(producto); }}>Editar</button>
                )}
                {puedeEliminar && (
                    <button type="button" className="boton-peligro" onClick={function () { setPorEliminar(producto); }}>
                        Eliminar
                    </button>
                )}
            </>
        );
    }

    if (cargando) {
        return <Cargando />;
    }

    if (errorCarga) {
        return <p className="error">{errorCarga}</p>;
    }

    if (modo !== "lista") {
        return (
            <section className="panel-admin">
                <h2>{modo === "crear" ? "Nuevo producto" : "Editar producto"}</h2>
                <FormularioProducto
                    producto={seleccionado}
                    alGuardar={guardar}
                    alCancelar={cancelar}
                />
            </section>
        );
    }

    return (
        <section className="panel-admin">
            <div className="barra-herramientas">
                <h2>Administración de productos</h2>
                {puedeCrear && <button type="button" onClick={abrirCrear}>Nuevo producto</button>}
            </div>

            <MensajeEstado tipo={mensaje.tipo} texto={mensaje.texto} />

            <TablaDatos
                columnas={COLUMNAS}
                filas={productos}
                renderAcciones={puedeEditar || puedeEliminar ? renderAcciones : null}
                vacio="Todavía no hay productos"
            />

            {porEliminar && (
                <VentanaConfirmacion
                    titulo="Eliminar producto"
                    texto={"¿Seguro que quieres eliminar \"" + porEliminar.nombre + "\"? Esta acción no se puede deshacer."}
                    textoConfirmar="Eliminar"
                    alConfirmar={confirmarEliminar}
                    alCancelar={function () { setPorEliminar(null); }}
                    procesando={eliminando}
                />
            )}
        </section>
    );
}

export default PanelAdmin;