import { Routes } from "@angular/router";
import { BudgetListComponent } from "./budget-list/budget-list.component";

export const budgetRoutes: Routes = [
    {
        path: '',
        component: BudgetListComponent,
        data: { title: 'Presupuesto' },
    },
];
export default budgetRoutes;
