const API_URL = "http://localhost:4000";
function validarLogin() {
    const formulario = document.querySelector("#form-login");

    if (!formulario) {
        return;
    }

    const campoCorreo = document.querySelector("#login-correo");
    const errorCorreo = document.querySelector("#error-login-correo");
    const campoPassword = document.querySelector("#login-password");
    const errorPassword = document.querySelector("#error-login-password");
    const errorGeneral = document.querySelector("#error-login-general");
    const mensajeExito = document.querySelector("#exito-login");
    const botonEnviar = formulario.querySelector("button[type='submit']");

    formulario.addEventListener("submit", async function(evento) {
        evento.preventDefault();

        const correo = campoCorreo.value.trim();
        const password = campoPassword.value;

        let hayErrores = false;

        errorCorreo.textContent = "";
        errorPassword.textContent = "";
        errorGeneral.textContent = "";
        mensajeExito.textContent = "";

        if (correo === "") {
            errorCorreo.textContent = "El correo es obligatorio";
            hayErrores = true;
        } else if (!correo.includes("@") || !correo.includes(".")) {
            errorCorreo.textContent = "Escribe un correo válido";
            hayErrores = true;
        }

        if (password === "") {
            errorPassword.textContent = "La contraseña es obligatoria";
            hayErrores = true;
        }

        if (hayErrores) {
            return;
        }

        botonEnviar.disabled = true;
        botonEnviar.textContent = "Ingresando...";

        try {
            const respuesta = await fetch(API_URL + "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo: correo,
                    password: password
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                errorGeneral.textContent = datos.mensaje || "No se pudo iniciar sesión";
                return;
            }

            guardarSesion(datos.token, datos.usuario);
            mensajeExito.textContent = "Bienvenido, " + datos.usuario.nombre + ". Te llevamos al inicio...";
            formulario.reset();

            setTimeout(function () {
                window.location.href = "../index.html";
            }, 1000);

        } catch (error) {
            errorGeneral.textContent = "No pudimos conectar con el servidor. Inténtalo de nuevo.";
        } finally {
            botonEnviar.disabled = false;
            botonEnviar.textContent = "Ingresar";
        }
    });

    campoCorreo.addEventListener("input", function() {
        errorCorreo.textContent = "";
        errorGeneral.textContent = "";
    });

    campoPassword.addEventListener("input", function() {
        errorPassword.textContent = "";
        errorGeneral.textContent = "";
    });
}

function validarRegistro() {
    const formulario = document.querySelector("#form-registro");

    if (!formulario) {
        return;
    }

    const campoNombre = document.querySelector("#registro-nombre");
    const errorNombre = document.querySelector("#error-registro-nombre");
    const campoCorreo = document.querySelector("#registro-correo");
    const errorCorreo = document.querySelector("#error-registro-correo");
    const campoPassword = document.querySelector("#registro-password");
    const errorPassword = document.querySelector("#error-registro-password");
    const campoConfirmar = document.querySelector("#registro-confirmar");
    const errorConfirmar = document.querySelector("#error-registro-confirmar");
    const errorGeneral = document.querySelector("#error-registro-general");
    const mensajeExito = document.querySelector("#exito-registro");
    const botonEnviar = formulario.querySelector("button[type='submit']");

    formulario.addEventListener("submit", async function(evento) {
        evento.preventDefault();

        const nombre = campoNombre.value.trim();
        const correo = campoCorreo.value.trim();
        const password = campoPassword.value;
        const confirmar = campoConfirmar.value;

        let hayErrores = false;

        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorPassword.textContent = "";
        errorConfirmar.textContent = "";
        errorGeneral.textContent = "";
        mensajeExito.textContent = "";

        if (nombre === "") {
            errorNombre.textContent = "El nombre es obligatorio";
            hayErrores = true;
        }

        if (correo === "") {
            errorCorreo.textContent = "El correo es obligatorio";
            hayErrores = true;
        } else if (!correo.includes("@") || !correo.includes(".")) {
            errorCorreo.textContent = "Escribe un correo válido";
            hayErrores = true;
        }

        if (password === "") {
            errorPassword.textContent = "La contraseña es obligatoria";
            hayErrores = true;
        } else if (password.length < 8) {
            errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres";
            hayErrores = true;
        }

        if (confirmar !== password) {
            errorConfirmar.textContent = "Las contraseñas no coinciden";
            hayErrores = true;
        }

        if (hayErrores) {
            return;
        }

        botonEnviar.disabled = true;
        botonEnviar.textContent = "Creando cuenta...";

        try {
            const respuesta = await fetch(API_URL + "/api/auth/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: nombre,
                    correo: correo,
                    password: password
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                const errores = datos.errores || {};

                if (errores.nombre) {
                    errorNombre.textContent = errores.nombre;
                }
                if (errores.correo) {
                    errorCorreo.textContent = errores.correo;
                }
                if (errores.password) {
                    errorPassword.textContent = errores.password;
                }
                if (Object.keys(errores).length === 0) {
                    errorGeneral.textContent = datos.mensaje || "No se pudo crear la cuenta";
                }
                return;
            }

            mensajeExito.textContent = "Cuenta creada. Te llevamos al inicio de sesión...";
            formulario.reset();

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);

        } catch (error) {
            errorGeneral.textContent = "No pudimos conectar con el servidor. Inténtalo de nuevo.";
        } finally {
            botonEnviar.disabled = false;
            botonEnviar.textContent = "Crear cuenta";
        }
    });

    campoNombre.addEventListener("input", function() {
        errorNombre.textContent = "";
    });

    campoCorreo.addEventListener("input", function() {
        errorCorreo.textContent = "";
    });

    campoPassword.addEventListener("input", function() {
        errorPassword.textContent = "";
    });

    campoConfirmar.addEventListener("input", function() {
        errorConfirmar.textContent = "";
    });
}

const PASSWORDS_COMUNES = [
    "12345678", "123456789", "1234567890", "11111111", "00000000",
    "12341234", "87654321", "123123123", "password", "password1",
    "password123", "qwerty123", "qwertyuiop", "abc12345", "contraseña",
    "contrasena", "iloveyou", "admin123", "letmein1", "welcome1"
];
const PASSWORD_LARGO_MINIMO = 8;
const LARGO_MINIMO_PARTE_CORREO = 4;

function evaluarRequisitos(password, confirmar, correo) {
    const minuscula = password.toLowerCase();
    const parteCorreo = correo.trim().toLowerCase().split("@")[0];
    const hayPassword = password !== "";

    return {
        largo: password.length >= PASSWORD_LARGO_MINIMO,
        comun: hayPassword && !PASSWORDS_COMUNES.includes(minuscula),
        correo: hayPassword && !(parteCorreo.length >= LARGO_MINIMO_PARTE_CORREO && minuscula.includes(parteCorreo)),
        coincide: hayPassword && confirmar === password
    };
}

function activarMejorasRegistro() {
    const formulario = document.querySelector("#form-registro");

    if (!formulario) {
        return;
    }

    const campoCorreo = document.querySelector("#registro-correo");
    const campoPassword = document.querySelector("#registro-password");
    const campoConfirmar = document.querySelector("#registro-confirmar");
    const lista = document.querySelector("#requisitos-password");

    function actualizarRequisitos() {
        const estado = evaluarRequisitos(campoPassword.value, campoConfirmar.value, campoCorreo.value);

        lista.querySelectorAll("li").forEach(function (item) {
            item.classList.toggle("cumplido", estado[item.dataset.requisito]);
        });
    }

    [campoCorreo, campoPassword, campoConfirmar].forEach(function (campo) {
        campo.addEventListener("input", actualizarRequisitos);
    });

    formulario.addEventListener("reset", function () {
        setTimeout(actualizarRequisitos, 0);
    });

    formulario.querySelectorAll(".btn-ver-password").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const campo = document.querySelector("#" + boton.dataset.objetivo);
            const estabaOculta = campo.type === "password";

            campo.type = estabaOculta ? "text" : "password";
            boton.textContent = estabaOculta ? "Ocultar" : "Mostrar";
            boton.setAttribute("aria-label", estabaOculta ? "Ocultar contraseña" : "Mostrar contraseña");
        });
    });
}

function validarRecuperar() {
    const formulario = document.querySelector("#form-recuperar");

    if (!formulario) {
        return;
    }

    const campoCorreo = document.querySelector("#recuperar-correo");
    const errorCorreo = document.querySelector("#error-recuperar-correo");
    const mensajeExito = document.querySelector("#exito-recuperar");

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const correo = campoCorreo.value.trim();

        let hayErrores = false;

        errorCorreo.textContent = "";
        mensajeExito.textContent = "";

        if (correo === "") {
            errorCorreo.textContent = "El correo es obligatorio";
            hayErrores = true;
        } else if (!correo.includes("@") || !correo.includes(".")) {
            errorCorreo.textContent = "Escribe un correo válido";
            hayErrores = true;
        }

        if (hayErrores) {
            return;
        }

        mensajeExito.textContent = "Si el correo está registrado, recibirás las instrucciones para crear una nueva contraseña.";
        console.log("Recuperación solicitada para:", correo);
    });

    campoCorreo.addEventListener("input", function() {
        errorCorreo.textContent = "";
        mensajeExito.textContent = "";
    });
}

validarLogin();
validarRegistro();
validarRecuperar();
activarMejorasRegistro();