import { Injectable } from '@angular/core';
import { UsuarioSys } from '../models/usuario-sys';

@Injectable({
    providedIn: 'root'
})
export class UsuarioSysService {

    private usuariosSistema: UsuarioSys[] = [
        { username: "admin_salo", password: "Admin123", rol: "admin" },
        { username: "reporte_salo", password: "Reporte123", rol: "reporte" }
    ];


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


    obtenerUsuariosSistema(username: string, password: string): UsuarioSys | undefined {
        return this.usuariosSistema.find(u =>
            u.username === username && u.password === password
        );
    }
}