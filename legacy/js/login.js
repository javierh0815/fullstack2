const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const usuarioEncontrado = GestionUsuario.validarCredenciales(username, password);

    if (usuarioEncontrado) {
        GestionUsuario.iniciarSesion(usuarioEncontrado);
        
        alert('¡Bienvenido, ' + usuarioEncontrado.nombre + '!');
        window.location.href = 'index.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
});