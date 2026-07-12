import { inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JsonFile {
    private http = inject(HttpClient);

    getAll<T>(url: string): Observable<T[]> {
        return this.http.get<T[]>(url);
    }

    getById<T extends { id: number | string }>(url: string, id:number | string): Observable<T | undefined> {
        return this.http.get<T[]>(url).pipe(
            map(items => items.find(item => item.id === id))
        )
    }

    post<T>(url: string, data: T): Observable<T> {
        return this.http.post<T>(url, data);
    }

    put<T>(url: string, id: number | string, data: T): Observable<T> {
        return this.http.put<T>(`${url}/${id}`, data);
    }

    delete(url: string, id: number | string): Observable<void> {
        return this.http.delete<void>(`${url}/${id}`);
    }
























}
