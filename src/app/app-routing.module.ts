import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './appAceros/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./appAceros/components/dashboard/dashboard.routes') },
                    { path: 'uikit', loadChildren: () => import('./appAceros/components/uikit/uikit.routes')},
                    { path: 'blocks', loadChildren: () => import('./appAceros/components/primeblocks/primeblocks.routes') },
                    { path: 'pages', loadChildren: () => import('./appAceros/components/pages/pages.routes') },
                    { path: 'categories', loadChildren: () => import('./appAceros/components/category/category.routes')},
                    { path: 'productos', loadChildren: () => import('./appAceros/components/products/product.routes') },
                    { path: 'inputs', loadChildren: () => import('./appAceros/components/inputs/input.routes') },
                    { path: 'outputs', loadChildren: () => import('./appAceros/components/outputs/outputs.routes') },
                    { path: 'budget', loadChildren: () => import('./appAceros/components/budget/budget.routes') },
                ]
            },
            { path: 'auth', loadChildren: () => import('./appAceros/components/auth/auth.routes') },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
