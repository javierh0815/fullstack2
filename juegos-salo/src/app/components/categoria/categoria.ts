import { Component, OnInit, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  
  nombreCategoria = signal('Cargando...');

  listaCategorias = [
        {id: '1', nombre: 'Juegos de Estrategia'},
        {id: '2', nombre: 'Juegos Familiares'},
        {id: '3', nombre: 'Juegos de Cartas'},
        {id: '4', nombre: 'Juegos de Rol'}
    ];


    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            const categoria = this.listaCategorias.find(cat => cat.id === id);
            if (categoria) {
                this.nombreCategoria.set(categoria.nombre);
            } else {
                this.nombreCategoria.set('Categoría no encontrada');
            }
        });
    }









}










