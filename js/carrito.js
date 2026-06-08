const Carrito = {
    agregarProducto: function(producto) {
        const usuarioActual = GestionUsuario.obtenerUsuarioActual();
        if (!usuarioActual) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            window.location.href = 'login.html';
            return;
        }

        let carro = JSON.parse(localStorage.getItem('carro_' + usuarioActual.username)) || [];

        const nuevaOrden = {
            idProducto: producto.id,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio), 
            usuario: usuarioActual.username,
            fecha: new Date().toISOString()
        };

        carro.push(nuevaOrden);
        localStorage.setItem('carro_' + usuarioActual.username, JSON.stringify(carro));
        alert('Producto agregado al carrito.');
    }
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const btn = e.target;
        
        Carrito.agregarProducto({
            id: btn.dataset.id,
            nombre: btn.dataset.nombre,
            precio: btn.dataset.precio 
        });
    }
});