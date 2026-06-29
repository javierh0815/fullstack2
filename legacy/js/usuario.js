const GestionUsuario = {

    obtenerTodos: function() {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    },

    guardar: function(nuevoUsuario) {
        const usuarios = this.obtenerTodos();
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    },

    existe: function(username) {
        return this.obtenerTodos().some(usuario => usuario.username === username);
    },

    buscarPorEmail: function(email) {
        return this.obtenerTodos().find(usuario => usuario.email === email);
    },

    validarCredenciales: function(username, password) {
        return this.obtenerTodos().find(usuario => usuario.username === username && usuario.password === password);
    },

    actualizar: function(username, datosActualizados) {
        const usuarios = this.obtenerTodos();
        const indice = usuarios.findIndex(usuario => usuario.username === username);
        if (indice !== -1) {
            usuarios[indice] = { ...usuarios[indice], ...datosActualizados };
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            return true;
        }
        return false;
    },

    obtenerUsuarioActual: function() {
        return JSON.parse(localStorage.getItem('usuarioActual'));
    },

    iniciarSesion: function(usuario) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    },

    cerrarSesion: function() {
        localStorage.removeItem('usuarioActual');
    }
}   