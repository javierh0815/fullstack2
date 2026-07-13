import { inject, Injectable } from '@angular/core';
import { JsonFile } from './json-file';
import { Usuario } from '../models/usuario';
import { map, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private jsonFile = inject(JsonFile);
    private url = 'http://localhost:3000/usuarios';


    private usuarioSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuarioActual());
    public usuario$ = this.usuarioSubject.asObservable();

    obtenerTodos(): Observable<Usuario[]> {
        return this.jsonFile.getAll<Usuario>(this.url);
    }

    guardar(usuario: Usuario): Observable<Usuario> {
        return this.jsonFile.post<Usuario>(this.url, usuario);
    }

    existe(username: string): Observable<boolean> {
        return this.obtenerTodos().pipe(
            map(usuarios => usuarios.some(u => u.username === username))
        );
    }

    validarCredenciales(username: string, password: string): Observable<Usuario | undefined> {
        return this.obtenerTodos().pipe(
            map(usuarios => usuarios.find(u => u.username === username && u.password === password))
        );
    }

    iniciarSesion(usuario: Usuario): void {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        this.usuarioSubject.next(usuario);
    }

    obtenerUsuarioActual(): Usuario | null {
        const usuario = localStorage.getItem('usuarioActual');
        return usuario ? JSON.parse(usuario) : null;
    }

    cerrarSesion(): void {
        localStorage.removeItem('usuarioActual');
        this.usuarioSubject.next(null);
    }

    actualizar(id: number | string, nuevosDatos: Partial<Usuario>): Observable<Usuario> {
        return this.jsonFile.put<Usuario>(this.url, id, nuevosDatos as Usuario);
    }

    buscarPorEmail(email: string): Observable<Usuario | undefined> {
        return this.obtenerTodos().pipe(
            map(usuarios => usuarios.find(u => u.email === email))
        );
    }
}