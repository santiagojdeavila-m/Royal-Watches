import { useState } from "react";
import { pedirRecomendacion } from "../apiIA";

const MAXIMO = 300;

function AsistenteIA() {
    const [pregunta, setPregunta] = useState("");
    const [cargando, setCargando] = useState(false);
    const [respuesta, setRespuesta] = useState("");
    const [error, setError] = useState("");
    const [aviso, setAviso] = useState("");

    async function enviar(evento) {
        evento.preventDefault();

        if (cargando) {
            return;
        }

        const texto = pregunta.trim();

        if (texto.length < 3) {
            setError("Escribe una pregunta de al menos 3 caracteres");
            return;
        }

        setCargando(true);
        setError("");
        setAviso("");
        setRespuesta("");

        try {
            setRespuesta(await pedirRecomendacion(texto));
        } catch (e) {
            if (e.estado === 429) {
                setAviso(e.message); // límite superado
            } else if (e.estado === 401) {
                setError("Tu sesión venció. Inicia sesión de nuevo");
            } else {
                setError(e.message);
            }
        } finally {
            setCargando(false);
        }
    }

    return (
        <section className="asistente-ia">
            <h2>Asistente de recomendaciones</h2>

            <form onSubmit={enviar}>
                <label htmlFor="pregunta-ia">¿Qué reloj buscas?</label>
                <textarea
                    id="pregunta-ia"
                    rows={3}
                    maxLength={MAXIMO}
                    value={pregunta}
                    onChange={function (e) { setPregunta(e.target.value); }}
                    placeholder="Ej: un reloj elegante para una boda, hasta cierto presupuesto"
                    style={{ width: "100%", maxWidth: "32rem", display: "block" }}
                />
                <small>{pregunta.length}/{MAXIMO}</small>
                <button type="submit" disabled={cargando}>
                    {cargando ? "Pensando..." : "Pedir recomendación"}
                </button>
            </form>

            {error && <p role="alert" className="error">{error}</p>}
            {aviso && <p role="status" className="aviso">{aviso}</p>}

            {/* Se muestra como texto plano: React lo escapa, no hay innerHTML */}
            <div aria-live="polite">
                {respuesta && <p style={{ whiteSpace: "pre-wrap" }}>{respuesta}</p>}
            </div>
        </section>
    );
}

export default AsistenteIA;