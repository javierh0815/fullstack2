import { inject, Injectable } from '@angular/core';
import { JsonFile } from './json-file';
import { UsuarioSys } from '../models/usuario-sys';

@Injectable({ providedIn: 'root' })
export class UsuarioSysService {
    private jsonFile = inject(JsonFile);
    private url = '/json/usuariosSys.json';
    private usuariosSistema: UsuarioSys[] = [];

    constructor() {

        this.jsonFile.getAll<UsuarioSys>(this.url).subscribe({
            next: (data) => this.usuariosSistema = data,
            error: (err) => console.error('Error al cargar usuarios del sistema', err)
        });
    }

    iniciarSesion(username: string, password: string): boolean {
        const usuarioEncontrado = this.usuariosSistema.find(u =>
            u.username === username && u.password === password
        );

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioActualSys', JSON.stringify(usuarioEncontrado));
            return true;
        }
        return false;
    }


    obtenerUsuarioActual(): UsuarioSys | null {
        const usuario = localStorage.getItem('usuarioActualSys');
        return usuario ? JSON.parse(usuario) : null;
    }

    cerrarSesion(): void {
        localStorage.removeItem('usuarioActualSys');
    }
}