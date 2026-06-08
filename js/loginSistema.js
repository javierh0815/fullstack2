document.addEventListener('DOMContentLoaded', () => {
    const formularioSys = document.getElementById('login-sistema-form');

    formularioSys.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username-sys').value.trim();
        const password = document.getElementById('password-sys').value.trim();
        const loginSysOk = GestionSistema.iniciarSesion(username, password);

        if (loginSysOk) {
            alert('Inicio de sesión exitoso.');
            window.location.href = 'consola.html';
        } else {
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
            formularioSys.reset();
        }
    });
});