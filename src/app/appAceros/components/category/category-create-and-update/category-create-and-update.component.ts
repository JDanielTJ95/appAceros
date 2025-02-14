import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/appAceros/service/category.service';
import { MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { Category } from 'src/app/appAceros/models/category.model';
import { BreadcrumbsComponent } from "../../../../shared/breadcrumbs/breadcrumbs.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, switchMap, map, of } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { fadeInOut } from 'src/app/shared/animations/general-animations';

@Component({
  selector: 'app-category-create-and-update',
  templateUrl: './category-create-and-update.component.html',
  styleUrl: './category-create-and-update.component.scss',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    RouterLink,
    ToastModule,
  ],
  providers: [ MessageService ],
  animations: [ fadeInOut ],
})
export class CategoryCreateAndUpdateComponent implements OnInit{

    public category: Category = {};
    public showComponent: boolean = true;

    constructor(
        private categoryService: CategoryService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private constService: ConstantsService,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(
                param => {
                    if (param.get('id') === '')
                        return of([]);
                    return this.categoryService.getCategoryById(
                        param.get('id')
                    );
                }
            ),
            map( (response): Category => response['category'] ),
            catchError(
                error => {
                    this.messageService.add({
                        severity: this.constService.ERROR,
                        summary: this.constService.ERROR2,
                        detail: error.message,
                    });
                    setTimeout(
                        () => this.router.navigate(['/categories']),
                        this.constService.TIME_MESSAGE
                    );
                    return of([]);
                }
            )
        ).subscribe( response => this.category = {...response as Category} );
    }

    public onSubmitSave(): void {
        if(!this.category.id)
            this.saveCategory();
        else
            this.editCategory();
        setTimeout(
            () => this.router.navigate(['/categories']),
            this.constService.TIME_MESSAGE
        );
    }

    public saveCategory(): void {
        this.categoryService.createCategory(
            this.category
        ).subscribe({
            next: () => this.messageService.add({
                severity: this.constService.SUCCESS,
                summary: this.constService.SUCCESSFUL,
                detail: 'Se creo la categoria',
                life: this.constService.TIME_MESSAGE
            }),
            error: error => this.messageService.add({
                severity: this.constService.ERROR,
                summary: this.constService.ERROR2,
                detail: error,
                life: this.constService.TIME_MESSAGE
            }),
        });
    }

    public editCategory(): void {
        this.categoryService
        .updateCategory(this.category)
        .subscribe({
            next: () => this.messageService.add({
                severity: this.constService.SUCCESS,
                summary: this.constService.SUCCESSFUL,
                detail: 'Se actualizo la categoria',
                life: this.constService.TIME_MESSAGE
            }),
            error: error => this.messageService.add({
                severity: this.constService.ERROR,
                summary: this.constService.ERROR2,
                detail: error,
                life: this.constService.TIME_MESSAGE
            }),
        })
    }
}
