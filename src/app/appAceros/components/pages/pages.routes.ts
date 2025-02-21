import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
    { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
    { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
    { path: '**', redirectTo: '/notfound' }
];
export default pagesRoutes;
