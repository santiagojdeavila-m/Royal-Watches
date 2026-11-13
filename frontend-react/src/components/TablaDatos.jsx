function TablaDatos({ columnas, filas, renderAcciones, vacio = "No hay datos para mostrar" }) {
    if (filas.length === 0) {
        return <p className="cargando">{vacio}</p>;
    }

    return (
        <div className="tabla-contenedor">
            <table className="tabla">
                <thead>
                    <tr>
                        {columnas.map(function (columna) {
                            return <th key={columna.clave}>{columna.titulo}</th>;
                        })}
                        {renderAcciones && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {filas.map(function (fila) {
                        return (
                            <tr key={fila.id}>
                                {columnas.map(function (columna) {
                                    const valor = fila[columna.clave];
                                    return <td key={columna.clave}>{columna.formato ? columna.formato(valor) : valor}</td>;
                                })}
                                {renderAcciones && <td className="tabla-acciones">{renderAcciones(fila)}</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TablaDatos;