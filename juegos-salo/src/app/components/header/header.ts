import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    categorias = [
      {id: 1, nombre: 'Estrategia'},
      {id: 2, nombre: 'Familiares'},
      {id: 3, nombre: 'Cartas'},
      {id: 4, nombre: 'Rol'}
      ];

    constructor(private usuarioService : UsuarioService){}

    get usuarioLogged(){
      return this.usuarioService.obtenerUsuarioActual();
    }



}
