import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UsuarioSys } from '../models/usuario-sys';

@Injectable({providedIn: 'root'})
export class UsuarioSysService {
    private http = inject(HttpClient);
    private url = '/json/usuariosSys.json';
    private usuariosSistema: UsuarioSys[] = [];

    constructor() {
        this.http.get<UsuarioSys[]>(this.url).subscribe(data => {
            this.usuariosSistema = data;
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


    obtenerUsuariosSistema(): UsuarioSys | null {
        const usuario = localStorage.getItem('usuarioActualSys');
        return usuario ? JSON.parse(usuario) : null;
    }

    cerrarSesion(): void {
        localStorage.removeItem('usuarioActualSys');
    }



}