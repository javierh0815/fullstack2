import { Component, signal, inject } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productoService = inject(ProductoService);
  

  productosDescuento = signal<Producto[]>([]);

  constructor() {

    this.productoService.obtenerProductoDescuento().subscribe({
      next: (data) => {
        this.productosDescuento.set(data);
      },
      error: (err) => console.error('Error al cargar ofertas', err)
    });
  }
}