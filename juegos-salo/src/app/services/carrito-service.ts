import { Injectable, inject } from '@angular/core';
import { Carrito } from '../models/carrito';
import { UsuarioService } from './usuario-service';

@Injectable({ providedIn: 'root' })
export class CarritoService {
    private usuarioService = inject(UsuarioService);

    private obtenerNuevoId(): number {
        let contador = parseInt(localStorage.getItem('contadorCompras') || '0');
        contador++;
        localStorage.setItem('contadorCompras', contador.toString());
        return contador;
    }

    agregarProducto(producto: any) {
        const usuarioActual = this.usuarioService.obtenerUsuarioActual();
        if (!usuarioActual) {
            alert('Debes iniciar sesión para agregar productos.');
            return;
        }
        
        const precioLimpio = producto.precio ? parseInt(producto.precio.toString().replace(/\./g, ''), 10) : 0;
        const nuevaOrden: Carrito = {
            id: this.obtenerNuevoId(),
            idProducto: producto.id,
            nombre: producto.nombre,
            precio: precioLimpio,
            usuario: usuarioActual.username,
            fecha: new Date().toISOString()
        };
        const clave = `carro_${usuarioActual.username}`;
        const carro = JSON.parse(localStorage.getItem(clave) || '[]');
        carro.push(nuevaOrden);
        localStorage.setItem(clave, JSON.stringify(carro));
        
        const historial = JSON.parse(localStorage.getItem('todasLasCompras') || '[]');
        historial.push(nuevaOrden);
        localStorage.setItem('todasLasCompras', JSON.stringify(historial));
        console.log(`Producto ${producto.nombre} guardado correctamente.`);
    }

    obtenerCarritoUsuario(): Carrito[] {
        const usuarioActual = this.usuarioService.obtenerUsuarioActual();
        return usuarioActual ? JSON.parse(localStorage.getItem(`carro_${usuarioActual.username}`) || '[]') : [];
    }


}


