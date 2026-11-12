const OPCIONES_POR_ROL = {
    visitante: [
        { id: "inicio", etiqueta: "Inicio" },
        { id: "catalogo", etiqueta: "Catálogo" },
        { id: "login", etiqueta: "Iniciar sesión" }
    ],
    cliente: [
        { id: "inicio", etiqueta: "Inicio" },
        { id: "catalogo", etiqueta: "Catálogo" },
        { id: "carrito", etiqueta: "Mi carrito" },
        { id: "salir", etiqueta: "Cerrar sesión" }
    ],
    admin: [
        { id: "inicio", etiqueta: "Inicio" },
        { id: "catalogo", etiqueta: "Catálogo" },
        { id: "administracion", etiqueta: "Administración" },
        { id: "salir", etiqueta: "Cerrar sesión" }
    ]
};

function Navegacion({ rol, vistaActual, alElegir }) {
    const opciones = OPCIONES_POR_ROL[rol] || OPCIONES_POR_ROL.visitante;

    return (
        <nav>
            <ul>
                {opciones.map(function (opcion) {
                    return (
                        <li key={opcion.id}>
                            <button
                                type="button"
                                className={opcion.id === vistaActual ? "activa" : ""}
                                onClick={function () { alElegir(opcion.id); }}
                            >
                                {opcion.etiqueta}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Navegacion;