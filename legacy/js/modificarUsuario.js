const formModificar = document.getElementById('modifica-form');

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = GestionUsuario.obtenerUsuarioActual();
    if (usuarioActual) {
        document.getElementById('nombre').value = usuarioActual.nombre;
        document.getElementById('username').value = usuarioActual.username;
        document.getElementById('username').readOnly = true;
        document.getElementById('email').value = usuarioActual.email;
        document.getElementById('fechaNacimiento').value = usuarioActual.fechaNacimiento;
        document.getElementById('direccion').value = usuarioActual.direccion;
    }
});

formModificar.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuarioActual = GestionUsuario.obtenerUsuarioActual();

    if (!usuarioActual) {
        alert('No se encontró el usuario actual');
        return;
    }

    const nuevosDatos = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        direccion: document.getElementById('direccion').value.trim()
    };

    if (GestionUsuario.actualizar(usuarioActual.username, nuevosDatos)) {
        alert('Perfil modificado exitosamente');
        localStorage.setItem('usuarioActual', JSON.stringify({ ...usuarioActual, ...nuevosDatos }));
    } else {
        alert('Error al modificar el perfil');
    }
});