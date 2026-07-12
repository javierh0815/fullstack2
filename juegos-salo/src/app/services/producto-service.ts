import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JsonFile } from './json-file';
import { Producto } from '../models/producto'


@Injectable({ providedIn: 'root' })
export class ProductoService {
    private jsonFile = inject(JsonFile);
    private url = 'http://localhost:3000/productos';


    obtenerProductos(): Observable<Producto[]> {
        return this.jsonFile.getAll<Producto>(this.url);
    }


    obtenerProductoPorCat(id:number): Observable<Producto[]> {
        return this.obtenerProductos().pipe(
            map(productos => productos.filter(p => p.categoriaId == id))
        );
    }


    obtenerProductoDescuento(): Observable<Producto[]> {
        return this.obtenerProductos().pipe(
            map(productos => productos.filter(p => p.precioAnterior !== undefined))
        );
    }





}
