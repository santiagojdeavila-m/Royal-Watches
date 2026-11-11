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