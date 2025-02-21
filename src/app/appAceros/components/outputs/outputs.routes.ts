import { Routes } from "@angular/router";
import { OutputListComponent } from "./output-list/output-list.component";

export const outputsRoutes: Routes = [
    {
        path: '',
        component: OutputListComponent,
        data: {title: 'Salidas'},
    }
];
export default outputsRoutes;
