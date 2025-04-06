import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { Output } from 'src/app/appAceros/models/output.model';
import { OutputService } from 'src/app/appAceros/service/output.service';
import { fadeInOut } from 'src/app/shared/animations/general-animations';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-output-list',
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
  templateUrl: './output-list.component.html',
  styleUrl: './output-list.component.scss'
})
export class OutputListComponent implements OnInit{

    public columns: Object[] = [];
    public outputs: Output[] = [];
    public submitted: boolean = false;
    public showComponent: boolean = true;

    constructor(
        private outputService: OutputService,
    ){}

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
        this.outputService
            .getAll()
            .subscribe({
                next: response => this.outputs = response,
                error: err => console.log(err),
            });
    }
}
