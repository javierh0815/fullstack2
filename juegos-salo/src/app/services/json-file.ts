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


























}
