const nombre = document.getElementById('nombre');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const email = document.getElementById('email');
const fechaNacimiento = document.getElementById('fecha-nacimiento');
const direccion = document.getElementById('direccion');
const formulario = document.getElementById('registro-form');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    limpiarFormulario();

    let formularioValido = true;

    const nombreValor = nombre.value.trim();
    const usernameValor = username.value.trim();
    const passwordValor = password.value.trim();
    const confirmPasswordValor = confirmPassword.value.trim();
    const emailValor = email.value.trim();
    const fechaNacimientoValor = fechaNacimiento.value;
    const direccionValor = direccion.value.trim();

    if (nombreValor === '') {
        mostrarError(nombre, 'El nombre es obligatorio');
        formularioValido = false;
    }
    
    if (usernameValor === '') {
        mostrarError(username, 'El nombre de usuario es obligatorio');
        formularioValido = false;
    }
    if (passwordValor === '') {
        mostrarError(password, 'La contraseña es obligatoria');
        formularioValido = false;
    }
    if (confirmPasswordValor === '') {
        mostrarError(confirmPassword, 'La confirmación de contraseña es obligatoria');
        formularioValido = false;
    } else if (passwordValor !== confirmPasswordValor) {
        mostrarError(confirmPassword, 'Las contraseñas no coinciden');
        formularioValido = false;
    }
    if (emailValor === '') {
        mostrarError(email, 'El correo electrónico es obligatorio');
        formularioValido = false;
    } else if (!validarEmail(emailValor)) {
        mostrarError(email, 'El correo electrónico no es válido');
        formularioValido = false;
    }

    if (direccionValor === '') {
        mostrarError(direccion, 'La dirección es obligatoria');
        formularioValido = false;
    }

    if (formularioValido) {
        alert('Registro exitoso');
        formulario.reset();
    }

});

    function mostrarError(campo) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
    }

    function marcarValido(campo) {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
    }