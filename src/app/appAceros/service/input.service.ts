import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Input } from '../models/input.model';

const base_url = `${ environment.base_url }/input`;

@Injectable({
  providedIn: 'root'
})
export class InputService {

    constructor( private http: HttpClient ) { }

    public getAll(): Observable<Input> {
        return this.http.get(base_url);
    }

    public getInputById(id: string): Observable<Input> {
        const url = `${ base_url }/getInputById/${ id }`;
        return this.http.get(url);
    }

    public createInput(input: Input): Observable<Input> {
        return this.http.post(base_url, input);
    }

    public updateInput(input: Input): Observable<Input> {
        const url = `${ base_url }/${ input.id }`;
        return this.http.put(url, input);
    }

    public deleteInput(input: Input): Observable<Input> {
        const url = `${ base_url }/${ input.id }`;
        return this.http.delete(url);
    }
}
