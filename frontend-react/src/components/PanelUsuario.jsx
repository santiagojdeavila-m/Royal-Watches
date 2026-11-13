import { useState } from "react";
import FormularioPerfil from "./FormularioPerfil";
import FormularioPassword from "./FormularioPassword";

const SECCIONES = [
    { id: "perfil", etiqueta: "Mi perfil" },
    { id: "seguridad", etiqueta: "Seguridad" }
];

function PanelUsuario({ alActualizarUsuario }) {
    const [seccion, setSeccion] = useState("perfil");

    return (
        <section className="panel">
            <h2>Mi panel</h2>

            <div className="panel-pestanas">
                {SECCIONES.map(function (item) {
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={item.id === seccion ? "activa" : ""}
                            onClick={function () { setSeccion(item.id); }}
                        >
                            {item.etiqueta}
                        </button>
                    );
                })}
            </div>

            {seccion === "perfil" && <FormularioPerfil alActualizarUsuario={alActualizarUsuario} />}
            {seccion === "seguridad" && <FormularioPassword />}
        </section>
    );
}

export default PanelUsuario;