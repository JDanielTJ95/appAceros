
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateAndUpdateComponent } from './category-create-and-update/category-create-and-update.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: CategoryListComponent,
            data: { title: 'Categorias' },
        },
        {
            path: 'create-or-edit/:id',
            component: CategoryCreateAndUpdateComponent,
            data: { title: 'Crear o eliminar categoria' },
        }
    ])],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
