import { useState } from "react";
import Navegacion from "./components/Navegacion";
import FormularioLogin from "./components/FormularioLogin";
import { obtenerSesion, cerrarSesion } from "./sesion";

function App() {
    const [sesion, setSesion] = useState(obtenerSesion);
    const [vista, setVista] = useState("inicio");

    const rol = sesion ? sesion.usuario.rol : "visitante";

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

    function renderizarContenido() {
        if (vista === "login" && !sesion) {
            return <FormularioLogin alIniciarSesion={alIniciarSesion} />;
        }

        if (vista === "catalogo") {
            return <p>Aquí irá el catálogo.</p>;
        }

        if (vista === "carrito" && rol === "cliente") {
            return <p>Aquí irá tu carrito.</p>;
        }

        if (vista === "administracion") {
            if (rol === "admin") {
                return <p>Panel de administración.</p>;
            }

            return <p className="error">No tienes acceso a esta sección.</p>;
        }

        return <p>{sesion ? `Hola, ${sesion.usuario.nombre}` : "Bienvenido a Royal Watches"}</p>;
    }

    return (
        <>
            <header className="encabezado">
                <h1>Royal Watches</h1>
                <Navegacion rol={rol} vistaActual={vista} alElegir={elegir} />
            </header>

            <main>
                <p className="rol">Rol actual: {rol}</p>
                {renderizarContenido()}
            </main>
        </>
    );
}

export default App;