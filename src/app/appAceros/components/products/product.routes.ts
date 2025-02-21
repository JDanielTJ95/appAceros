import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductsCreateComponent } from "./products-create/products-create.component";
import { ProductsEditComponent } from "./products-edit/products-edit.component";

export const productRoutes: Routes = [
        {
            path: '',
            component: ProductsListComponent,
            data: { title: 'Productos' },
        },
        {
            path: 'create',
            component: ProductsCreateComponent,
            data: { title: 'nuevo' },
        },
        {
            path: 'edit/:id',
            component: ProductsEditComponent,
            data: { title: 'edit' },
        },
];
export default productRoutes;
