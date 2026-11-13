function CampoFormulario({ id, etiqueta, tipo = "text", valor, alCambiar, error }) {
    return (
        <div className="campo">
            <label htmlFor={id}>{etiqueta}</label>
            <input
                id={id}
                type={tipo}
                value={valor}
                onChange={function (evento) { alCambiar(evento.target.value); }}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default CampoFormulario;