const GestionUsuario = {
    guardar: function(nuevoUsuario) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    },

    existe: function(username) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.some(usuario => usuario.username === username);
    },

    buscarPorEmail: function(email) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.find(usuario => usuario.email === email);
    }

}