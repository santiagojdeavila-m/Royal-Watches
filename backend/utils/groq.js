const URL_GROQ = "https://api.groq.com/openai/v1/chat/completions";
const TIEMPO_MAXIMO_MS = 15000;

class ErrorIA extends Error {
    constructor(tipo) {
        super(tipo);
        this.tipo = tipo;
    }
}

async function preguntar(mensajes) {
    const clave = process.env.GROQ_API_KEY;
    const modelo = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

    if (!clave) {
        console.error("Falta GROQ_API_KEY en backend/.env");
        throw new ErrorIA("config");
    }

    let respuesta;

    try {
        respuesta = await fetch(URL_GROQ, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + clave
            },
            body: JSON.stringify({
                model: modelo,
                messages: mensajes,
                temperature: 0.4,
                max_tokens: 400
            }),
            signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS)
        });
    } catch (error) {
        if (error.name === "TimeoutError" || error.name === "AbortError") {
            throw new ErrorIA("tiempo");
        }
        console.error("No se pudo conectar con Groq:", error.name);
        throw new ErrorIA("proveedor");
    }

    if (respuesta.status === 429) {
        throw new ErrorIA("limite");
    }

    if (!respuesta.ok) {
        console.error("Groq respondió con estado", respuesta.status);
        throw new ErrorIA("proveedor");
    }

    let texto;

    try {
        const datos = await respuesta.json();
        texto = datos.choices[0].message.content;
    } catch {
        throw new ErrorIA("proveedor");
    }

    if (typeof texto !== "string" || texto.trim() === "") {
        throw new ErrorIA("proveedor");
    }

    return texto.trim();
}

module.exports = { preguntar, ErrorIA };