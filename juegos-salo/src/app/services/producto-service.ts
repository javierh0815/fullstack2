import { Injectable } from '@angular/core';
import { Producto } from '../models/producto'


@Injectable({ providedIn: 'root' })
export class ProductoService {
    private productos : Producto[] = [
        { id: 1, categoriaId: 1, nombre: 'Brass: Birmingham', descripcion: 'Un juego de construcción de redes y gestión de recursos ambientado en la Revolución Industrial.', precio: 42490, precioAnterior: 49990, imagen: '/img/cat1_brass.png' },
        { id: 2, categoriaId: 1, nombre: 'Catan', descripcion: 'Un clásico juego de construcción de civilizaciones donde los jugadores compiten por colonizar una isla rica en recursos.', precio: 29990, imagen: '/img/cat1_catan.png' },
        { id: 3, categoriaId: 1, nombre: 'Risk', descripcion: 'Un juego de conquista global donde los jugadores luchan por el control del mundo a través de la estrategia militar y la diplomacia.', precio: 19990, imagen: '/img/cat1_risk.png' },
        { id: 4, categoriaId: 2, nombre: 'Jenga', descripcion: 'Un juego de habilidad y equilibrio donde los jugadores deben retirar bloques de una torre sin que esta se derrumbe.', precio: 14990, imagen: '/img/cat2_jenga.png' },
        { id: 5, categoriaId: 2, nombre: 'Monopoly Premier League', descripcion: 'Una versión temática del clásico juego de mesa, donde los jugadores compran y venden propiedades relacionadas con la Premier League de fútbol.', precio: 24990, imagen: '/img/cat2_monopoly.png' },
        { id: 6, categoriaId: 2, nombre: 'Twister', descripcion: 'Un juego de destreza física donde los jugadores deben colocar sus manos y pies en círculos de colores sin caerse.', precio: 15990, precioAnterior: 19990, imagen: '/img/cat2_twister.png' },
        { id: 7, categoriaId: 3, nombre: 'Dragon Ball Z: Card Game', descripcion: 'Un juego de cartas estratégico basado en la serie de anime Dragon Ball Z.', precio: 19990, imagen: '/img/cat3_dbz.png' },
        { id: 8, categoriaId: 3, nombre: 'Magic: The Gathering', descripcion: 'Un juego de cartas coleccionables donde los jugadores asumen el papel de poderosos magos que luchan entre sí.', precio: 29990, precioAnterior: 32990, imagen: '/img/cat3_magic.png' },
        { id: 9, categoriaId: 3, nombre: 'One Piece Card Game', descripcion: 'Un juego de cartas basado en la popular serie de manga y anime One Piece, donde los jugadores forman equipos de personajes para enfrentarse en batallas estratégicas.', precio: 24990, imagen: '/img/cat3_op.png' },
        { id: 10, categoriaId: 4, nombre: 'Cyberpunk Red', descripcion: 'Un juego de rol ambientado en un futuro distópico donde los jugadores asumen el papel de mercenarios en una ciudad llena de tecnología avanzada y corrupción.', precio: 34990, imagen: '/img/cat4_cyber.png' },
        { id: 11, categoriaId: 4, nombre: 'Dungeons & Dragons Planescape', descripcion: 'Una edición especial del clásico juego de rol Dungeons and Dragons, ambientada en el multiverso de Planescape, donde los jugadores exploran diferentes planos de existencia y enfrentan desafíos únicos.', precio: 39990, imagen: '/img/cat4_dndpl.png' },
        { id: 12, categoriaId: 4, nombre: "Shadowrun", descripcion: 'Un juego de rol que combina elementos de ciencia ficción y fantasía, ambientado en un futuro cercano donde la magia y la tecnología coexisten, y los jugadores asumen el papel de mercenarios en un mundo lleno de conspiraciones y peligros.', precio: 29990, precioAnterior: 34990, imagen: '/img/cat4_sr.png'}

    ];


    obtenerProductoPorCat(id:number): Producto[] {
        return this.productos.filter(p => p.categoriaId == id);
    }


    obtenerProductoDescuento(): Producto[] {
        return this.productos.filter(p => p.precioAnterior !== undefined);
    }





}
