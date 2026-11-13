function VentanaConfirmacion({ titulo, texto, textoConfirmar = "Confirmar", alConfirmar, alCancelar, procesando }) {
    return (
        <div className="modal-fondo">
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
                <h3 id="modal-titulo">{titulo}</h3>
                <p>{texto}</p>
                <div className="modal-botones">
                    <button type="button" className="boton-secundario" onClick={alCancelar} disabled={procesando}>
                        Cancelar
                    </button>
                    <button type="button" className="boton-peligro" onClick={alConfirmar} disabled={procesando}>
                        {procesando ? "Procesando..." : textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VentanaConfirmacion;