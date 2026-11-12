import { useState } from "react";

function TarjetaProducto({ nombre, marca }) {
    const [meGusta, setMeGusta] = useState(false);

    function alternarMeGusta() {
        setMeGusta(!meGusta);
    }

    return (
        <article className="tarjeta">
            <h3>{nombre}</h3>
            <p>{marca}</p>
            <button onClick={alternarMeGusta}>
                {meGusta ? "♥ Te gusta" : "♡ Me gusta"}
            </button>
        </article>
    );
}

export default TarjetaProducto;