import { useState } from "react";
import FormularioLogin from "./components/FormularioLogin";
import { obtenerSesion, cerrarSesion } from "./sesion";

function App() {
    const [sesion, setSesion] = useState(obtenerSesion);

    function salir() {
        cerrarSesion();
        setSesion(null);
    }

    return (
        <main>
            <h1>Royal Watches</h1>

            {sesion ? (
                <section>
                    <p>Hola, {sesion.usuario.nombre} ({sesion.usuario.rol})</p>
                    <button onClick={salir}>Cerrar sesión</button>
                </section>
            ) : (
                <FormularioLogin alIniciarSesion={function () { setSesion(obtenerSesion()); }} />
            )}
        </main>
    );
}

export default App;