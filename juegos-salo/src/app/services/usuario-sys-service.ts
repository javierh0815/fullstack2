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


    obtenerUsuariosSistema(username: string, password: string): UsuarioSys | undefined {
        return this.usuariosSistema.find(u =>
            u.username === username && u.password === password
        )
    }










}
