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
        return;
    }

    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                GestionUsuario.cerrarSesion();
                alert('Has cerrado sesión correctamente.');
                window.location.href = 'index.html';
            }
        });
    }







});