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
                    { path: '', loadChildren: () => import('./appAceros/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./appAceros/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'blocks', loadChildren: () => import('./appAceros/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./appAceros/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'categories', loadChildren: () => import('./appAceros/components/category/category.module').then(m => m.CategoryModule) },
                    { path: 'productos', loadChildren: () => import('./appAceros/components/products/products.module').then(m => m.ProductsModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./appAceros/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
