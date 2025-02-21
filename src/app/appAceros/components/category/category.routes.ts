
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateAndUpdateComponent } from './category-create-and-update/category-create-and-update.component';
import { Routes } from '@angular/router';

export const categoryRoutes: Routes = [
        {
            path: '',
            component: CategoryListComponent,
            data: { title: 'Categorias' },
        },
        {
            path: 'create-or-edit/:id',
            component: CategoryCreateAndUpdateComponent,
            data: { title: 'Crear o eliminar categoria' },
        },
];
export default categoryRoutes;
