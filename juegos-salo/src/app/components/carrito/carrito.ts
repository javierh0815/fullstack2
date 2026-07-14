import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito-service';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})

export class CarritoComponent implements OnInit {
  private carritoService = inject(CarritoService);
  private usuarioService = inject(UsuarioService); 
  items: any[] = [];
  total: number = 0;

ngOnInit() {
  
  const usuarioActual = this.usuarioService.obtenerUsuarioActual();

  if (usuarioActual) {
    this.cargarCarrito(usuarioActual.username);
  } else {
    console.error("No hay usuario logueado al iniciar el componente");
  }
}

cargarCarrito(username: string) {
  this.carritoService.obtenerTodosLosCarritos().subscribe({
    next: (todos) => {

      this.items = todos.filter(c => c.usuario === username);
      this.calcularTotal();
    }
  });
}

  private calcularTotal() {
    this.total = this.items.reduce((sum, item) => sum + (item.precio || 0), 0);
  }
}