const GestionSistema = {
    iniciarSesion: (username, password) => {
        const usuarioEncontradoSys = Object.values(UsuariosSistema).find(u => 
            u.username === username && u.password === password
        );
        if (usuarioEncontradoSys) {
            localStorage.setItem('usuarioActualSys', JSON.stringify(usuarioEncontradoSys));
            return true;
        }
        return false;
    },

    obtenerUsuarioActualSys: () => {
        return JSON.parse(localStorage.getItem('usuarioActualSys'));
    },

    cerrarSesion: () => {
        localStorage.removeItem('usuarioActualSys');
    }
};