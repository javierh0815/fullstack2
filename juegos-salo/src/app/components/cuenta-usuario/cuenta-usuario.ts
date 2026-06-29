import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';


@Component({
  selector: 'app-cuenta-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cuenta-usuario.html',
  styleUrl: './cuenta-usuario.css',
})
export class CuentaUsuario implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router

  ){}

  ngOnInit(){
    this.usuario = this.usuarioService.obtenerUsuarioActual();
    
    if (!this.usuario){
      alert('Debes iniciar sesión para ver tu perfil.');
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      this.usuarioService.cerrarSesion();
      alert('Has cerrado sesión correctamente.');
      this.router.navigate(['/']);
    }
  }































}
