import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UsuarioSysService } from '../../services/usuario-sys-service';
import { UsuarioService } from '../../services/usuario-service';
import { ProductoService } from '../../services/producto-service';
import { CarritoService } from '../../services/carrito-service';
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
      alert('Debes iniciar sesión para acceder al sistema.');
      this.router.navigate(['/login-sys']);
      return;
    }
    this.usuarioSys.set(usuario);
    this.cargarDatos();
  }

  cargarDatos() {
    this.userService.obtenerTodos().subscribe(data => this.usuarios.set(data));
    this.prodService.obtenerProductos().subscribe(data => this.productos.set(data));
    
   
    this.carritoService.obtenerTodosLosCarritos().subscribe({
      next: (data) => this.compras.set(data),
      error: (err) => console.error('Error cargando historial:', err)
    });
  }

  mostrarSeccion(seccion: 'usuarios' | 'carritos' | 'productos') {
    this.seccionActual.set(seccion);
  }

  abrirEdicion(u: any) { 
    if (this.usuarioSys()?.rol !== 'admin') return alert("Acción no permitida.");
    this.usuarioEditando.set(u); 
    this.editForm.patchValue(u); 
  }
  
  guardarEdicion() {
    if (this.usuarioSys()?.rol !== 'admin') return alert("Acción no permitida.");
    
    this.userService.actualizar(this.editForm.value.username, this.editForm.value).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente.');
        this.usuarioEditando.set(null);
        this.cargarDatos();
      },
      error: (err) => console.error(err)
    });
  }

  eliminarCompra(id: number) {
    if (this.usuarioSys()?.rol !== 'admin') return alert("Acción no permitida.");
    
    if (confirm('¿Estás seguro de eliminar esta compra?')) {
      this.carritoService.eliminarItem(id).subscribe({
        next: () => {
          alert('Compra eliminada.');
          this.cargarDatos();
        },
        error: (err) => console.error(err)
      });
    }
  }

  cerrarSesion() { 
    this.sysService.cerrarSesion(); 
    this.router.navigate(['/login-sys']); 
  }
}