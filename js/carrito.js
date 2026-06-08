const Carrito = {


    obtenerNuevoId: function() {
        let contador = parseInt(localStorage.getItem('contadorCompras')) || 0;
        contador++;
        localStorage.setItem('contadorCompras', contador);
        return contador;
    },

    agregarProducto: function(producto) {
        const usuarioActual = GestionUsuario.obtenerUsuarioActual();
        if (!usuarioActual) {
            alert('Debes iniciar sesión para agregar productos al carrito.');
            window.location.href = 'login.html';
            return;
        }


        const nuevaOrden = {
            id: this.obtenerNuevoId(),
            idProducto: producto.id,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio), 
            usuario: usuarioActual.username,
            fecha: new Date().toISOString()
        };


        let carro = JSON.parse(localStorage.getItem('carro_' + usuarioActual.username)) || [];
        carro.push(nuevaOrden);
        localStorage.setItem('carro_' + usuarioActual.username, JSON.stringify(carro));


        let todasLasCompras = JSON.parse(localStorage.getItem('todasLasCompras')) || [];
        todasLasCompras.push(nuevaOrden);
        localStorage.setItem('todasLasCompras', JSON.stringify(todasLasCompras));

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