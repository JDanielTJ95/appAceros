import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Input } from '../models/input.model';
import { IInput } from '../Interfaces/input';

const base_url = `${ environment.base_url }/input`;

@Injectable({
  providedIn: 'root'
})
export class InputService {

    constructor( private http: HttpClient ) { }

    public getAll(): Observable<Input[]> {
        return this.http.get(base_url).pipe(
            map((response: {ok: Boolean, msg: Input[]}) => response.msg),
        );
    }

    public getInputById(id: string): Observable<Input> {
        const url = `${ base_url }/getInputById/${ id }`;
        return this.http.get(url);
    }

    public createInput(input: IInput): Observable<boolean> {
        return this.http.post(base_url, input).pipe(
            map((response: {ok: boolean, Input }) => response.ok)
        );
    }

    public updateInput(input: Input): Observable<boolean> {
        const url = `${ base_url }/${ input.id }`;
        return this.http.put(url, input).pipe(
            map((response: {ok: boolean, msg: string}) => response.ok)
        );
    }

    public deleteInput(input: Input): Observable<Input> {
        const url = `${ base_url }/${ input.id }`;
        return this.http.delete(url);
    }
}
