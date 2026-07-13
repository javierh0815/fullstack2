import { Injectable, inject } from '@angular/core';
import { Carrito } from '../models/carrito';
import { UsuarioService } from './usuario-service';
import { JsonFile } from './json-file'; 
import { forkJoin, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarritoService {
    private usuarioService = inject(UsuarioService);
    private jsonFile = inject(JsonFile);
    

    private readonly API_CARRITO = 'http://localhost:3000/carrito';

    agregarProducto(producto: any) {
        const usuarioActual = this.usuarioService.obtenerUsuarioActual();
        if (!usuarioActual) {
            alert('Debes iniciar sesión para agregar productos.');
            return;
        }
        
        const precioLimpio = producto.precio ? parseInt(producto.precio.toString().replace(/\./g, ''), 10) : 0;
        

        const nuevaOrden: any = {
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
        
        console.log(`Producto ${producto.nombre} añadido al carrito local.`);
    }

    obtenerCarritoUsuario(): Carrito[] {
        const usuarioActual = this.usuarioService.obtenerUsuarioActual();
        return usuarioActual ? JSON.parse(localStorage.getItem(`carro_${usuarioActual.username}`) || '[]') : [];
    }


    obtenerHistorialCarrito(): Observable<Carrito[]> {
        return this.jsonFile.getAll<Carrito>(this.API_CARRITO);
    }

    finalizarCompra() {
        const usuarioActual = this.usuarioService.obtenerUsuarioActual();
        if (!usuarioActual) return;

        const items = this.obtenerCarritoUsuario();
        if (items.length === 0) return;

        const peticiones = items.map(item => 
            this.jsonFile.post(this.API_CARRITO, item).pipe(
                catchError(err => {
                    console.error('Error al subir compra:', err);
                    return of(null); 
                })
            )
        );

        forkJoin(peticiones).subscribe(() => {
            console.log('Compra finalizada y registrada en el servidor.');
            localStorage.removeItem(`carro_${usuarioActual.username}`);
        });
    }
}