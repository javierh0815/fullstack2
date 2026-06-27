import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    obtenerTodos() {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    }

    guardar(usuario: Usuario): void{
        const usuarios = this.obtenerTodos();
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }


    existe(username: string): boolean {
        return this.obtenerTodos().some((usuario: Usuario) => usuario.username === username);
    }

    validarCredenciales(username: string, password: string): Usuario | undefined {
        const usuarios = this.obtenerTodos();
        return usuarios.find((u: Usuario) => u.username === username && u.password === password);
    }

    iniciarSesion(usuario: Usuario) {

        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    }

    obtenerUsuarioActual() {
        const usuario = localStorage.getItem('usuarioActual');
        return usuario ? JSON.parse(usuario) : null;
    }

    cerrarSesion() {
        localStorage.removeItem('usuarioActual');
    }



    actualizar(username: string, nuevosDatos: Partial<Usuario>): boolean {
        const usuarios = this.obtenerTodos();
        const index = usuarios.findIndex((u: Usuario) => u.username === username);
    
        if (index !== -1) {
        
            usuarios[index] = { ...usuarios[index], ...nuevosDatos };
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            this.iniciarSesion(usuarios[index]);
            return true;
        }
        return false;
    }


    buscarPorEmail(email: string): Usuario | undefined {
        const usuarios = this.obtenerTodos();
        return usuarios.find((u: Usuario) => u.email === email);
    }













}

