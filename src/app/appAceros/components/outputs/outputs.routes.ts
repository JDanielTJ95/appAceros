import { Routes } from "@angular/router";
import { OutputListComponent } from "./output-list/output-list.component";
import { OutputCreateComponent } from "./output-create/output-create.component";

export const outputsRoutes: Routes = [
    {
        path: '',
        component: OutputListComponent,
        data: {title: 'Salidas'},
    },
    {
        path: 'create',
        component: OutputCreateComponent,
        data: {title: 'nuevo'},
    },
];
export default outputsRoutes;
