import { Injectable, Service } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    obtenerTodos() {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    }

    guardar(nuevoUsuario: any){
        const usuarios = this.obtenerTodos();
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }


    existe(username: string): boolean {
        return this.obtenerTodos().some((usuario: any) => usuario.username === username);
    }






















}

