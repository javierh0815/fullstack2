import { Injectable, inject } from '@angular/core';
import { Carrito } from '../models/carrito';
import { UsuarioService } from './usuario-service';
import { JsonFile } from './json-file';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarritoService {
    private usuarioService = inject(UsuarioService);
    private jsonFile = inject(JsonFile);
    private readonly API_CARRITO = 'http://localhost:3000/carrito';

    agregarProducto(producto: any): Observable<any> {
        const usuarioActual = this.usuarioService.obtenerUsuarioActual();
        
        if (!usuarioActual) {
            throw new Error('Debes iniciar sesión para realizar esta acción.');
        }

        const nuevaOrden = {
            idProducto: producto.id,
            nombre: producto.nombre,
            precio: typeof producto.precio === 'string' 
                ? parseInt(producto.precio.replace(/\./g, ''), 10) 
                : producto.precio,

            
            usuario: usuarioActual.username, 
            fecha: new Date().toISOString()
        };

        return this.jsonFile.post(this.API_CARRITO, nuevaOrden);
    }

    obtenerCarrito(): Observable<Carrito[]> {
        const usuario = this.usuarioService.obtenerUsuarioActual(); 

        if (!usuario) {
            console.log("No hay usuario logueado");
            return of([]);
        }

        return this.jsonFile.getAll<Carrito>(this.API_CARRITO).pipe(
            map(items => {
                
                return items.filter(i => String(i.usuario).trim() === String(usuario.username).trim());
            })
        );
    }

    obtenerTodosLosCarritos(): Observable<Carrito[]> {
        return this.jsonFile.getAll<Carrito>(this.API_CARRITO);
    }

    eliminarItem(id: number | string): Observable<void> {
        return this.jsonFile.delete(this.API_CARRITO, id);
    }
}