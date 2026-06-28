import { Component, OnInit, signal, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto-service';
import { CarritoService } from '../../services/carrito-service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  
  nombreCategoria = signal('Cargando...');
  productos = signal<Producto[]>([]);

  private productoService = inject(ProductoService);

  private carritoService = inject(CarritoService);

  listaCategorias = [
        {id: '1', nombre: 'Juegos de Estrategia'},
        {id: '2', nombre: 'Juegos Familiares'},
        {id: '3', nombre: 'Juegos de Cartas'},
        {id: '4', nombre: 'Juegos de Rol'}
    ];


    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            const categoria = this.listaCategorias.find(cat => cat.id === id);
            if (categoria) {
                this.nombreCategoria.set(categoria.nombre);
                const idNumero = Number(id);
                this.productos.set(this.productoService.obtenerProductoPorCat(idNumero));
            } else {
                this.nombreCategoria.set('Categoría no encontrada');
                this.productos.set([]);
            }
        });
    }

    agregarAlCarrito(producto: Producto) {
        this.carritoService.agregarProducto(producto);
        alert(`${producto.nombre} ha sido agregado al carrito.`);
    }







}










