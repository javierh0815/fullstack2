document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = GestionUsuario.obtenerUsuarioActual();

    if (usuarioActual) {
        document.querySelector('h2').textContent = `Bienvenido, ${usuarioActual.nombre}`;
        document.getElementById('perfil-nombre').textContent = usuarioActual.nombre;
        document.getElementById('perfil-username').textContent = usuarioActual.username;
        document.getElementById('perfil-email').textContent = usuarioActual.email;
        document.getElementById('perfil-fecha').textContent = usuarioActual.fechaNacimiento;
        document.getElementById('perfil-direccion').textContent = usuarioActual.direccion;
    } else {
        alert('Debes iniciar sesión para ver tu perfil.');
        window.location.href = 'login.html';
    }
});