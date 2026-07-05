import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto'


@Injectable({ providedIn: 'root' })
export class ProductoService {
    private http = inject(HttpClient);
    private url = '/json/productos.json';


    obtenerProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.url);
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
