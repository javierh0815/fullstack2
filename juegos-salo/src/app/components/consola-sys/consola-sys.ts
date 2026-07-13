import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UsuarioSysService } from '../../services/usuario-sys-service';
import { UsuarioService } from '../../services/usuario-service';
import { ProductoService } from '../../services/producto-service';
import { CarritoService } from '../../services/carrito-service'; // Asegúrate de importar el servicio de carrito
import { Router } from '@angular/router';

@Component({
  selector: 'app-consola-sys',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './consola-sys.html',
  styleUrl: './consola-sys.css',
})
export class ConsolaSys implements OnInit {
  private sysService = inject(UsuarioSysService);
  private userService = inject(UsuarioService);
  private prodService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  usuarioSys = signal<any>(null);
  seccionActual = signal<'usuarios' | 'carritos' | 'productos'>('usuarios');
  editForm: FormGroup;
  
  usuarios = signal<any[]>([]);
  compras = signal<any[]>([]);
  productos = signal<any[]>([]);
  idBusqueda = signal<string>('');
  usuarioEditando = signal<any | null>(null);

  constructor() {
    this.editForm = this.fb.group({
      username: [''],
      nombre: [''],
      email: ['']
    });
  }

  ngOnInit() {
    const usuario = this.sysService.obtenerUsuarioActual();
    if (!usuario) {
      this.router.navigate(['/login-sys']);
      return;
    }
    this.usuarioSys.set(usuario);
    this.cargarDatos();
  }

  cargarDatos() {
    this.userService.obtenerTodos().subscribe(data => this.usuarios.set(data));
    this.prodService.obtenerProductos().subscribe(data => this.productos.set(data));
    
    // Carga de compras desde el servidor (reemplazando el localStorage antiguo)
    this.carritoService.obtenerHistorialCarrito().subscribe(data => this.compras.set(data));
  }

  buscarProductoPorId() {
    const id = Number(this.idBusqueda());
    if (!id) {
      this.prodService.obtenerProductos().subscribe(data => this.productos.set(data));
      return;
    }
    this.prodService.obtenerProductoPorCat(id).subscribe({
      next: (p) => this.productos.set([p]),
      error: () => { alert('Producto no encontrado'); this.productos.set([]); }
    });
  }

  mostrarSeccion(seccion: 'usuarios' | 'carritos' | 'productos') {
    this.seccionActual.set(seccion);
  }

  // ... métodos de edición y eliminación (mantenidos igual) ...
  abrirEdicion(u: any) { this.usuarioEditando.set(u); this.editForm.patchValue(u); }
  
  guardarEdicion() {
    this.userService.actualizar(this.editForm.value.username, this.editForm.value).subscribe(() => {
      this.usuarioEditando.set(null);
      this.cargarDatos();
    });
  }

  cerrarSesion() { this.sysService.cerrarSesion(); this.router.navigate(['/login-sys']); }
}