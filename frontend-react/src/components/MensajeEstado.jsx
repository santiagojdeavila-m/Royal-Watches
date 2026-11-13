function MensajeEstado({ tipo, texto }) {
    if (!texto) {
        return null;
    }

    return (
        <p className={tipo === "exito" ? "exito" : "error"} role={tipo === "exito" ? "status" : "alert"}>
            {texto}
        </p>
    );
}

export default MensajeEstado;