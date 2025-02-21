import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Output } from '../models/output.model';
import { Observable } from 'rxjs';

const base_url = `${ environment.base_url }/output`;

@Injectable({
  providedIn: 'root'
})
export class OutputService {

    constructor( private http: HttpClient ) { }

    public getAll(): Observable<Output> {
        return this.http.get(base_url);
    }

    public getOutputById(id: string): Observable<Output> {
        const url = `${ base_url }/getOutputById/${ id }`;
        return this.http.get(url);
    }

    public createOutput(output: Output): Observable<Output> {
        return this.http.post(base_url, output);
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
