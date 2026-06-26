import { Injectable } from '@angular/core';
import { Producto } from '../models/producto'


@Injectable({ providedIn: 'root' })
export class ProductoService {
    private productos : Producto[] = [
        { id: 1, categoriaId: 1, nombre: 'Brass: Birmingham', descripcion: 'Un juego de construcción de redes y gestión de recursos ambientado en la Revolución Industrial.', precio: 42490, precioAnterior: 49990, imagen: 'assets/img/cat1_brass.png' },
        { id: 2, categoriaId: 1, nombre: 'Catan', descripcion: 'Un clásico juego de construcción de civilizaciones donde los jugadores compiten por colonizar una isla rica en recursos.', precio: 29990, imagen: 'assets/img/cat1_catan.png' },
        { id: 3, categoriaId: 1, nombre: 'Risk', descripcion: 'Un juego de conquista global donde los jugadores luchan por el control del mundo a través de la estrategia militar y la diplomacia.', precio: 19990, imagen: 'assets/img/cat1_catan.png' }
    ];


    obtenerProductoPorCat(id:number): Producto[] {
        return this.productos.filter(p => p.categoriaId == id);
    }








}
