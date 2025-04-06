import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Output } from '../models/output.model';
import { map, Observable } from 'rxjs';
import { IOutput } from '../Interfaces/output';

const base_url = `${ environment.base_url }/output`;

@Injectable({
  providedIn: 'root'
})
export class OutputService {

    constructor( private http: HttpClient ) { }

    public getAll(): Observable<Output[]> {
        return this.http.get(base_url).pipe(
            map((response: {ok: boolean, msg: Output[]}) => response.msg)
        );
    }

    public getOutputById(id: string): Observable<Output> {
        const url = `${ base_url }/getOutputById/${ id }`;
        return this.http.get(url);
    }

    public createOutput(output: IOutput): Observable<boolean> {
        return this.http.post(base_url, output).pipe(
            map((response: {ok: boolean, Output}) => response.ok)
        );
    }

    public updateOutput(output: Output): Observable<Output> {
        const url = `${ base_url }/${ output.id }`;
        return this.http.put(url, output);
    }

    public deleteOutput(output: Output): Observable<Output> {
        const url = `${ base_url }/${ output.id }`;
        return this.http.delete(url);
    }
}
