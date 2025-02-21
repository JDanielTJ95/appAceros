import { Routes } from "@angular/router";
import { InputsListComponent } from "./inputs-list/inputs-list.component";

export const inputRoutes: Routes = [
    {
        path: '',
        component: InputsListComponent,
        data: { title: 'Entradas' },
    },
];
export default inputRoutes;
