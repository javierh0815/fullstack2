const nombre = document.getElementById('nombre');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
const fechaNacimiento = document.getElementById('fechaNacimiento');
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
    } else if (!validarContrasena(passwordValor)) {
        mostrarError(password, 'La contraseña debe tener entre 6 y 18 caracteres, al menos una letra mayúscula y un número');
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
    if (fechaNacimientoValor !== '') {
        const edad = validarFechaNacimiento(fechaNacimientoValor);
        if (edad < 13) {
            mostrarError(fechaNacimiento, 'Debes ser mayor de 13 años');
            formularioValido = false;
        }
    }
    if (direccionValor === '') {
        mostrarError(direccion, 'La dirección es obligatoria');
        formularioValido = false;
    }

    if (formularioValido) {

        const nuevoUsuario = {
            nombre: nombreValor,
            username: usernameValor,
            password: passwordValor,
            email: emailValor,
            fechaNacimiento: fechaNacimientoValor,
            direccion: direccionValor
        };
        /*
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
        */

        if (GestionUsuario.existe(usernameValor)) {
            mostrarError(username, 'El nombre de usuario ya existe');
        } else {
            GestionUsuario.guardar(nuevoUsuario);
            alert('Registro exitoso');
            formulario.reset();
        }
    }
});

    function mostrarError(input, mensaje) {
        const error = document.createElement('div');
        error.className = 'text-danger small mt-1 error-mensaje';
        error.innerText = mensaje;
        input.parentElement.appendChild(error);
    }

    function limpiarFormulario() {
        const errores = document.querySelectorAll('.error-mensaje');
        errores.forEach(error => error.remove());
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarFechaNacimiento(fecha) {
            const fechaActual = new Date();
            const nacimiento = new Date(fecha);

            let edad = fechaActual.getFullYear() - nacimiento.getFullYear();
            const mes = fechaActual.getMonth();
            const dia = fechaActual.getDate();
            const mesNacimiento = nacimiento.getMonth();
            const diaNacimiento = nacimiento.getDate();

            if (mes < mesNacimiento || (mes === mesNacimiento && dia < diaNacimiento)) {
                edad--;
            }

            return edad;
        

    }

    function validarCorreoElectronico(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
    }

    function validarContrasena(password) {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.=#\-]{6,18}$/;
            return regex.test(password);
    }