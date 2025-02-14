import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { DeleteGenericDialogComponent } from 'src/app/shared/delete-generic-dialog/delete-generic-dialog.component';
import { DeleteGenericMultipleDialogComponent } from 'src/app/shared/delete-generic-multiple-dialog/delete-generic-multiple-dialog.component';

import { fadeInOut } from 'src/app/shared/animations/general-animations';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/appAceros/models/product.model';
import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { ProductService } from 'src/app/appAceros/service/product.service';
import { map } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ButtonModule,
    CommonModule,
    DeleteGenericDialogComponent,
    DeleteGenericMultipleDialogComponent,
    DialogModule,
    FormsModule,
    InputTextModule,
    RouterLink,
    TableModule,
    TagModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [ MessageService ],
  animations: [ fadeInOut ],
  templateUrl: './products-list.component.html',
  styleUrl: '../../../../../assets/demo/styles/badges.css'
})
export class ProductsListComponent implements OnInit {

    public columns: Object[] = [];
    public products: Product[] = [];
    public product: Product = {};
    public selectedProducts: Product[] = [];
    public deleteProductsDialog: boolean = false;
    public deleteProductDialog: boolean = false;
    public submitted: boolean = false;
    public showComponent: boolean = true;

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private constService: ConstantsService,
    ) {}

    ngOnInit(): void {
        this.setColumns();
        this.productService.getAll().pipe(
            map(({products}) => products),
        ).subscribe({
            next: response => this.products = response,
            error: err => console.error(err),
        });
    }

    public setColumns(): void {
        this.columns = [
            { field: 'name', header: 'Nombre' },
            { field: 'price', header: 'Precio' },
            { field: 'category', header: 'Categoria' },
            { field: 'stock', header: 'Stock' },
            { field: 'status', header: 'Estado' },
            { field: 'description', header: 'Descripcion' },
            { field: 'available', header: 'Disponible' },
            { field: 'size', header: 'Talla' },
        ]
    }

    public deleteProduct(): void {}

    public deleteSelectedProducts(): void {}

    public confirmDelte(): void {}

    public confirmDeleteSelected(): void {}

    public onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
