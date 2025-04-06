import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Input } from 'src/app/appAceros/models/input.model';
import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { InputService } from 'src/app/appAceros/service/input.service';
import { fadeInOut } from 'src/app/shared/animations/general-animations';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-inputs-list',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    RouterLink,
    TableModule,
    ToolbarModule,
    ToastModule,
  ],
  providers: [ MessageService ],
  animations: [ fadeInOut ],
  templateUrl: './inputs-list.component.html',
  styleUrl: './inputs-list.component.scss'
})
export class InputsListComponent implements OnInit{

    public columns: Object[] = [];
    public inputs: Input[] = [];
    public submitted: boolean = false;
    public showComponent: boolean = true;

    constructor(
        private inputService: InputService,
    ) {}

    ngOnInit(): void {
        this.setColumns();
        this.getInputs();
    }

    public setColumns(): void {
        this.columns = [
            { field: 'product', header: 'Product' },
            { field: 'amount', header: 'Cantidad' },
            { field: 'date', header: 'Fecha' },
        ]
    }

    public onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    private getInputs(): void{
        this.inputService
            .getAll()
            .subscribe({
                next: response => this.inputs = response,
                error: err => console.log(err),
            });
    }
}
