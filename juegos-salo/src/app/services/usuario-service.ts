import { Injectable } from '@angular/core';

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

    validarCredenciales(username: string, password: string) {
        const usuarios = this.obtenerTodos();

        return usuarios.find((u: any) => u.username === username && u.password === password);
    }

    iniciarSesion(usuario: any) {

        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    }

    obtenerUsuarioActual() {
        const usuario = localStorage.getItem('usuarioActual');
        return usuario ? JSON.parse(usuario) : null;
    }

    cerrarSesion() {
        localStorage.removeItem('usuarioActual');
    }




















}

