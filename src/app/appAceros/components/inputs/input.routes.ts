import { Routes } from "@angular/router";
import { InputsListComponent } from "./inputs-list/inputs-list.component";
import { InputCreateComponent } from "./input-create/input-create.component";

export const inputRoutes: Routes = [
    {
        path: '',
        component: InputsListComponent,
        data: { title: 'Entradas' },
    },
    {
        path: 'create',
        component: InputCreateComponent,
        data: { title: 'nuevo' },
    },
];
export default inputRoutes;
