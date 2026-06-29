const UsuariosSistema = {
    admin: {
        username: "admin_salo",
        password: "Admin123",
        rol: "admin"
    },
    reporte: {
        username: "reporte_salo",
        password: "Reporte123",
        rol: "reporte"
    }

}

const obtenerUsuarioSistema = (username, password) => {
    return Object.values(UsuariosSistema).find(u => 
        u.username === username && u.password === password
    );
};