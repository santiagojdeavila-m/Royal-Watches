function validarLogin() {
    const formulario = document.querySelector("#form-login");

    if (!formulario) {
        return;
    }

    const campoCorreo = document.querySelector("#login-correo");
    const errorCorreo = document.querySelector("#error-login-correo");
    const campoPassword = document.querySelector("#login-password");
    const errorPassword = document.querySelector("#error-login-password");

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const correo = campoCorreo.value.trim();
        const password = campoPassword.value;

        let hayErrores = false;

        errorCorreo.textContent = "";
        errorPassword.textContent = "";

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

        console.log("Login válido:", correo);
    });

    campoCorreo.addEventListener("input", function() {
        errorCorreo.textContent = "";
    });

    campoPassword.addEventListener("input", function() {
        errorPassword.textContent = "";
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

    formulario.addEventListener("submit", function(evento) {
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
        } else if (password.length < 6) {
            errorPassword.textContent = "La contraseña debe tener al menos 6 caracteres";
            hayErrores = true;
        }

        if (confirmar !== password) {
            errorConfirmar.textContent = "Las contraseñas no coinciden";
            hayErrores = true;
        }

        if (hayErrores) {
            return;
        }

        console.log("Registro válido:", nombre, correo);
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