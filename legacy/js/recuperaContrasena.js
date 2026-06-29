const formulario = document.getElementById('recupera-contra-form');


formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const usuarioEncontrado = GestionUsuario.buscarPorEmail(email);

    if (usuarioEncontrado) {
            alert('Se ha enviado un correo con las instrucciones para recuperar tu contraseña a ' + email);
            console.log('La contraseña del usuario es:' + usuarioEncontrado.password);
            formulario.reset();
        } else {
            alert('No se encontró ningún usuario con ese correo electrónico');
        }
    });