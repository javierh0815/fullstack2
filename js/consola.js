document.addEventListener('DOMContentLoaded', () => {
    const usuarioSys = GestionSistema.obtenerUsuarioActualSys();
    if (!usuarioSys) {
        alert('Debes iniciar sesión para acceder a la consola.');
        window.location.href = 'loginSistema.html';
        return;
    }

    mostrarSeccion('usuarios');


    const formEdicion = document.getElementById('form-edicion');
    formEdicion.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('edit-username').value;
        const nuevosDatos = {
            nombre: document.getElementById('edit-nombre').value,
            email: document.getElementById('edit-email').value
        };

        const actualizado = GestionUsuario.actualizar(username, nuevosDatos);

        if (actualizado) {
            alert('Usuario actualizado exitosamente.');
            document.getElementById('section-edicion').style.display = 'none';
            cargarTablaUsuarios(usuarioSys.rol);
        } else {
            alert('Error al actualizar el usuario.');
        }
    });
});

function cargarTablaUsuarios(rol) {
    const tablaBody = document.getElementById('tabla-usuarios');
    const usuarios = GestionUsuario.obtenerTodos();

    tablaBody.innerHTML = '';

    usuarios.forEach(u => {
        const tr = document.createElement('tr');

        const botones = (rol === 'admin') 
            ? `<button class="btn btn-warning btn-sm" onclick="abrirEdicion('${u.username}')">Editar</button>` 
            : '<span class="text-muted">Solo lectura</span>';

        tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.nombre}</td>
            <td>${u.email}</td>
            <td class="acciones-admin">${botones}</td>
        `;
        tablaBody.appendChild(tr);
    });
}

function abrirEdicion(username) {
    const usuarioSys = GestionSistema.obtenerUsuarioActualSys();
    if (usuarioSys.rol !== 'admin') {
        alert("Acción no permitida.");
        return;
    }

    const usuarios = GestionUsuario.obtenerTodos();
    const usuario = usuarios.find(u => u.username === username);

    if (usuario) {
        document.getElementById('edit-username').value = usuario.username;
        document.getElementById('edit-nombre').value = usuario.nombre;
        document.getElementById('edit-email').value = usuario.email;

        document.getElementById('section-edicion').style.display = 'block';
    }
}


function cancelarEdicion() {
    document.getElementById('section-edicion').style.display = 'none';
}



function cargarTablaCarritos(rol) {
    const tablaBody = document.getElementById('tabla-carritos'); 
    const todasLasCompras = JSON.parse(localStorage.getItem('todasLasCompras')) || [];

    tablaBody.innerHTML = '';

    todasLasCompras.forEach(compra => {
        const tr = document.createElement('tr');


        const acciones = (rol === 'admin') 
            ? `<button class="btn btn-danger btn-sm" onclick="eliminarCompra(${compra.id})">Eliminar</button>` 
            : '<span class="text-muted">Solo lectura</span>';

        tr.innerHTML = `
            <td>#${compra.id}</td>
            <td>${compra.usuario}</td>
            <td>${compra.nombre}</td>
            <td>$${compra.precio.toLocaleString()}</td>
            <td>${new Date(compra.fecha).toLocaleDateString()}</td>
            <td>${acciones}</td>
        `;
        tablaBody.appendChild(tr);
    });
}


function eliminarCompra(id) {
    if (confirm('¿Estás seguro de eliminar esta compra?')) {
        let todasLasCompras = JSON.parse(localStorage.getItem('todasLasCompras')) || [];

        todasLasCompras = todasLasCompras.filter(c => c.id !== id);
        localStorage.setItem('todasLasCompras', JSON.stringify(todasLasCompras));
        

        const usuarioSys = GestionSistema.obtenerUsuarioActualSys();
        cargarTablaCarritos(usuarioSys.rol);
    }
}


function mostrarSeccion(seccion) {
    const sUsuarios = document.getElementById('seccion-usuarios');
    const sCarritos = document.getElementById('seccion-carritos');
    const usuarioSys = GestionSistema.obtenerUsuarioActualSys();

    if (seccion === 'usuarios') {
        sUsuarios.style.display = 'block';
        sCarritos.style.display = 'none';
        cargarTablaUsuarios(usuarioSys.rol);
    } else {
        sUsuarios.style.display = 'none';
        sCarritos.style.display = 'block';
        cargarTablaCarritos(usuarioSys.rol);
    }
}