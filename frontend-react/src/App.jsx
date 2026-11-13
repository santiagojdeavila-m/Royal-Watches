import { useState, useEffect } from "react";
import Navegacion from "./components/Navegacion";
import FormularioLogin from "./components/FormularioLogin";
import PanelUsuario from "./components/PanelUsuario";
import PanelAdmin from "./components/PanelAdmin";
import { obtenerSesion, cerrarSesion } from "./sesion";
import { pedirOpciones } from "./api";
import AsistenteIA from "./components/AsistenteIA";

const OPCIONES_VISITANTE = [
    { id: "inicio", etiqueta: "Inicio" },
    { id: "catalogo", etiqueta: "Catálogo" },
    { id: "login", etiqueta: "Iniciar sesión" }
];

function App() {
    const [sesion, setSesion] = useState(obtenerSesion);
    const [vista, setVista] = useState("inicio");
    const [opcionesServidor, setOpcionesServidor] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [errorOpciones, setErrorOpciones] = useState("");

    const rol = sesion ? sesion.usuario.rol : "visitante";
    const opciones = sesion ? opcionesServidor : OPCIONES_VISITANTE;

    useEffect(function () {
        if (!sesion) {
            setOpcionesServidor([]);
            setPermisos([]);
            setErrorOpciones("");
            return;
        }

        let vigente = true;

        pedirOpciones()
            .then(function (datos) {
                if (vigente) {
                    setOpcionesServidor(datos.opciones);
                    setPermisos(datos.permisos || []);
                    setErrorOpciones("");
                }
            })
            .catch(function (error) {
                if (!vigente) {
                    return;
                }

                if (error.estado === 401) {
                    cerrarSesion();
                    setSesion(null);
                    return;
                }

                setErrorOpciones("No pudimos cargar tus opciones");
            });

        return function () {
            vigente = false;
        };
    }, [sesion]);

    function elegir(id) {
        if (id === "salir") {
            cerrarSesion();
            setSesion(null);
            setVista("inicio");
            return;
        }

        setVista(id);
    }

    function alIniciarSesion() {
        setSesion(obtenerSesion());
        setVista("inicio");
    }

    function refrescarSesion() {
        setSesion(obtenerSesion());
    }

    function renderizarContenido() {
        if (vista === "login" && !sesion) {
            return <FormularioLogin alIniciarSesion={alIniciarSesion} />;
        }

        if (vista === "panel" && sesion) {
            return <PanelUsuario alActualizarUsuario={refrescarSesion} />;
        }

        if (vista === "catalogo") {
            return <p>Aquí irá el catálogo.</p>;
        }

        if (vista === "carrito" && rol === "cliente") {
            return <p>Aquí irá tu carrito.</p>;
        }

        if (vista === "administracion") {
            const puedeAdministrar = permisos.includes("productos:crear")
                || permisos.includes("productos:editar")
                || permisos.includes("productos:eliminar");

            if (sesion && puedeAdministrar) {
                return <PanelAdmin permisos={permisos} />;
            }

            return <p className="error">No tienes acceso a esta sección.</p>;
        }

        return (
            <>
                <p>{sesion ? `Hola, ${sesion.usuario.nombre}` : "Bienvenido a Royal Watches"}</p>
                {sesion && <AsistenteIA />}
            </>
        );
    }

    return (
        <>
            <header className="encabezado">
                <h1>Royal Watches</h1>
                <Navegacion opciones={opciones} vistaActual={vista} alElegir={elegir} />
            </header>

            <main>
                {errorOpciones && <p className="error">{errorOpciones}</p>}
                {renderizarContenido()}
            </main>
        </>
    );
}

export default App;