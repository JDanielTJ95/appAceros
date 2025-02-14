import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductsCreateComponent } from "./products-create/products-create.component";
import { ProductsEditComponent } from "./products-edit/products-edit.component";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: ProductsListComponent,
            data: { title: 'Productos' },
        },
        {
            path: 'create',
            component: ProductsCreateComponent,
            data: { title: 'create' },
        },
        {
            path: 'edit/:id',
            component: ProductsEditComponent,
            data: { title: 'edit' },
        },
    ])],
    exports: [ RouterModule ],
})
export class ProductRoutingModule {}
