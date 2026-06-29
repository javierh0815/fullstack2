document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = GestionUsuario.obtenerUsuarioActual();
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    if (!usuarioActual) {
        alert('Debes iniciar sesión para ver tu carrito.');
        window.location.href = 'login.html';
        return;
    }

    // Obtenemos el carro específico de este usuario
    const carro = JSON.parse(localStorage.getItem('carro_' + usuarioActual.username)) || [];

    if (carro.length === 0) {
        listaCarrito.innerHTML = '<tr><td colspan="3" class="text-center">Tu carrito está vacío.</td></tr>';
        return;
    }

    let sumaTotal = 0;

    carro.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${new Date(producto.fecha).toLocaleDateString()}</td>
        `;
        listaCarrito.appendChild(tr);
        sumaTotal += producto.precio;
    });

    totalCarrito.textContent = `Total: $${sumaTotal.toLocaleString()}`;
});