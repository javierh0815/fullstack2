import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioSysService } from '../../services/usuario-sys-service';
import { UsuarioService } from '../../services/usuario-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consola-sys',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consola-sys.html',
  styleUrl: './consola-sys.css',
})
export class ConsolaSys implements OnInit {
  private sysService = inject(UsuarioSysService);
  private userService = inject(UsuarioService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  usuarioSys = signal<any>(null);
  seccionActual = signal<'usuarios' | 'carritos'>('usuarios');
  editForm: FormGroup;
  
  usuarios = signal<any[]>([]);
  compras = signal<any[]>([]);
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

    this.userService.obtenerTodos().subscribe({
      next: (data) => this.usuarios.set(data),
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
    
    this.compras.set(JSON.parse(localStorage.getItem('todasLasCompras') || '[]'));
  }

  mostrarSeccion(seccion: 'usuarios' | 'carritos') {
    this.seccionActual.set(seccion);
  }

  abrirEdicion(u: any) {
    if (this.usuarioSys()?.rol !== 'admin') return alert("Acción no permitida.");
    this.usuarioEditando.set(u);
    this.editForm.patchValue(u);
  }

  guardarEdicion() {

    if (this.usuarioSys()?.rol !== 'admin') {
      alert("Acción no permitida.");
      return;
    }

    const username = this.editForm.value.username;


    this.userService.actualizar(username, this.editForm.value).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente.');
        this.usuarioEditando.set(null);
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Hubo un error al guardar los cambios.');
      }
    });
  }

  eliminarCompra(id: number) {

    if (this.usuarioSys()?.rol !== 'admin') {
      return alert("Acción no permitida.");
    }
    
    if (confirm('¿Estás seguro de eliminar esta compra?')) {

      let todasLasCompras = JSON.parse(localStorage.getItem('todasLasCompras') || '[]');
      todasLasCompras = todasLasCompras.filter((c: any) => c.id !== id);
      
      localStorage.setItem('todasLasCompras', JSON.stringify(todasLasCompras));
      

      this.compras.set(todasLasCompras);
    }
  }

  cerrarSesion() {
    this.sysService.cerrarSesion(); 
    this.router.navigate(['/login-sys']);
  }




}