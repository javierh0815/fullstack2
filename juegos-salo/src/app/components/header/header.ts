import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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







}
