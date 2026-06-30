import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  categorias = [
      {id: 1, nombre: 'Estrategia'},
      {id: 2, nombre: 'Familiares'},
      {id: 3, nombre: 'Cartas'},
      {id: 4, nombre: 'Rol'}
  ];

  get usuarioLogged(){
    return this.usuarioService.obtenerUsuarioActual();
  }

  cerrarSesion(){
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
  }
    

}
