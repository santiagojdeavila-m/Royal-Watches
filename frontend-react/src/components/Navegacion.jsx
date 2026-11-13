function Navegacion({ opciones, vistaActual, alElegir }) {
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