import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Interfaces/product';
import { environment } from 'src/environments/environment';
import { map, Observable, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { ICategory } from '../Interfaces/category';

const base_url = `${ environment.base_url }/products`;

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<any> {
        return this.http.get(base_url).pipe(
            map(
                (response: {ok: boolean, products: Product[]}) =>
                    response.products
            ),
            map(products =>
                products.map(product => {
                    const { _id, ...category } = product.category as ICategory;
                    return {
                        ...product,
                        category: {
                            ...category,
                            id: _id
                        }
                    };
                })
            ),
        );
    }

    public getProductById(id: string): Observable<any> {
        const url = `${ base_url }/getProductById/${ id }`;
        return this.http.get(url).pipe(
            map(
                (response: {ok: boolean, product: Product[]}) =>
                    response.product
            ),
            map(products =>
                products.map(product => {
                    const { _id, ...category } = product.category as ICategory;
                    return {
                        ...product,
                        category: {
                            ...category,
                            id: _id
                        }
                    };
                })
            ),
        );
    }

    public createProduct(product: any): Observable<any> {
        return this.http.post(base_url, product);
    }

    public updateProduct(product: any): Observable<any> {
        const url = `${ base_url }/${ product.id }`;
        return this.http.put(url, product).pipe(
            map((response: {ok: boolean, product: Product}) => response.ok)
        );
    }

    public deleteProduct(product: any): Observable<any> {
        const url = `${ base_url }/${ product.id }`;
        return this.http.delete(url);
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
