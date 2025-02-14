import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category.model';

const base_url = `${ environment.base_url }/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  public getAll(): Observable<Category[]> {
    return this.http.get( base_url ).pipe(
        map((response: {ok: boolean, msg: Category[]}) => response.msg)
    );
  }

  public getCategoryById(id: string): Observable<Category> {
    const url = `${ base_url }/getCategoryById/${ id }`;
    return this.http.get(url);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post(base_url, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    const url = `${ base_url }/${ category.id }`;
    return this.http.put(url, category);
  }

  public deleteCategory(category: Category): Observable<Category> {
    const url = `${ base_url }/${ category.id }`;
    return this.http.delete(url);
  }
}
