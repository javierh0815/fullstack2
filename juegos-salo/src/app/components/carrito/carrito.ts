import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito-service';
import { Carrito } from '../../models/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})

export class CarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  items: Carrito[] = [];
  total: number = 0;

  ngOnInit() {
    this.items = this.carritoService.obtenerCarritoUsuario();
    this.calcularTotal();
    
  }

  private calcularTotal() {
    this.total = this.items.reduce((sum,item) => sum + item.precio, 0);
  }
}
