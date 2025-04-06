import { Category } from '../../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CategoryService } from 'src/app/appAceros/service/category.service';
import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { MessageService } from 'primeng/api';

import { BreadcrumbsComponent } from "../../../../shared/breadcrumbs/breadcrumbs.component";
import { DeleteGenericDialogComponent } from "../../../../shared/delete-generic-dialog/delete-generic-dialog.component";
import { DeleteGenericMultipleDialogComponent } from "../../../../shared/delete-generic-multiple-dialog/delete-generic-multiple-dialog.component";

import { fadeInOut } from 'src/app/shared/animations/general-animations';

@Component({
  selector: 'app-category-list',
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
    ToastModule,
    ToolbarModule,
],
  providers: [ MessageService ],
  animations: [ fadeInOut ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit{

    public columns: Object[] = [];
    public categories: Category[] = [];
    public category: Category = {};
    public selectedCategories: Category[] = [];
    public deleteCategoriesDialog: boolean = false;
    public deleteCategoryDialog: boolean = false;
    public submitted: boolean = false;
    public showComponent: boolean = true;

    constructor(
        private categoryService: CategoryService,
        private messageService: MessageService,
        private constService: ConstantsService,
    ) {}

    ngOnInit(): void {
        this.setColumns;
        this.categoryService
        .getAll()
        .subscribe(data => this.categories = data)
    }

    public setColumns(): void {
        this.columns = [
            { field: 'name', header: "Nombre"},
            { field: "description", header: "Descripcion" },
        ]
    }

    public deleteCategory(category: Category): void {
        this.deleteCategoryDialog = true;
        this.category = { ...category };
    }

    public deleteSelectedCategories(): void {
        this.deleteCategoriesDialog = true;
    }

    public confirmDelete(event: boolean): void {
        if (event) {
            this.categories = this.categories.filter(
                val => val.id !== this.category.id
            );
            this.categoryService.deleteCategory(
                this.category
            ).subscribe({
                next: () => this.messageService.add({
                    severity: this.constService.SUCCESS,
                    summary: this.constService.SUCCESSFUL,
                    detail: 'Categoria Eliminada',
                    life: this.constService.TIME_MESSAGE
                }),
                error: error => this.messageService.add({
                    severity: this.constService.ERROR,
                    summary: this.constService.ERROR2,
                    detail: error,
                    life: this.constService.TIME_MESSAGE
                }),
            });
            this.category = {};
        }
        this.deleteCategoryDialog = false;
    }

    public confirmDeleteSelected(event: boolean): void {
        if (event){
            this.categories = this.categories.filter(
                val => !this.selectedCategories.includes(val)
            );
            this.selectedCategories.forEach(
                category => this.categoryService
                    .deleteCategory(category)
                    .subscribe({
                       next: () => this.messageService.add({
                           severity: this.constService.SUCCESS,
                           summary: this.constService.SUCCESSFUL,
                           detail: category.name + ' eliminado',
                           life: this.constService.TIME_MESSAGE
                        }),
                        error: error => this.messageService.add({
                            severity: this.constService.ERROR,
                            summary: this.constService.ERROR2,
                            detail: error,
                            life: this.constService.TIME_MESSAGE
                        }),
                    })
            );
        }
        this.selectedCategories = [];
        this.deleteCategoriesDialog = false;
    }

    public onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    public onSubmitNew(): void {
        this.showComponent = false;
    }
}
