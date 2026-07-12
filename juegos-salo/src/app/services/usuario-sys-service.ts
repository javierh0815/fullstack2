import { inject, Injectable } from '@angular/core';
import { JsonFile } from './json-file';
import { UsuarioSys } from '../models/usuario-sys';
import { Observable, tap, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioSysService {
    private jsonFile = inject(JsonFile);
    private url = 'http://localhost:3000/usuariosSys'; 
    private usuariosSistema: UsuarioSys[] = [];

    cargarUsuarios(): Observable<UsuarioSys[]> {
        if (this.usuariosSistema.length > 0) return of(this.usuariosSistema);
        
        return this.jsonFile.getAll<UsuarioSys>(this.url).pipe(
            tap(data => this.usuariosSistema = data)
        );
    }


    iniciarSesion(username: string, password: string): Observable<boolean> {
        return this.cargarUsuarios().pipe(
            map(usuarios => {
                const usuarioEncontrado = usuarios.find(u =>
                    u.username === username && u.password === password
                );

                if (usuarioEncontrado) {
                    localStorage.setItem('usuarioActualSys', JSON.stringify(usuarioEncontrado));
                    return true;
                }
                return false;
            })
        );
    }

    obtenerUsuarioActual(): UsuarioSys | null {
        const usuario = localStorage.getItem('usuarioActualSys');
        return usuario ? JSON.parse(usuario) : null;
    }

    cerrarSesion(): void {
        localStorage.removeItem('usuarioActualSys');
    }
}