import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Size } from 'src/app/appAceros/enums/size.enums';
import { Product } from 'src/app/appAceros/models/product.model';
import { UtilsService } from 'src/app/appAceros/service/utils.service';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from 'src/app/appAceros/service/category.service';
import { Category } from 'src/app/appAceros/models/category.model';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink,
    TagModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: '../../../../../assets/demo/styles/badges.css'
})
export class ProductsFormComponent implements OnInit{

    @Input()
    public product?: Product;
    @Output()
    public selectedProduct = new EventEmitter<Product>();
    public sizes: Size[] | undefined;
    public categories: Category[] = [];
    public formProduct: FormGroup = this.formBuilder.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required]],
        category: ['', [Validators.required]],
        stock: ['', [Validators.required]],
        status: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(3)]],
        available: ['', [Validators.required]],
        size: ['', [Validators.required]],
    });

    constructor(
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private categoryService: CategoryService,
    ) {}

    ngOnInit(): void {
        this.sizes = this.utilsService.getSizes();
        this.getCategories();
    }

    public onSubmitSave(): void {
        if (this.formProduct.invalid){
            this.formProduct.markAllAsTouched();
            return;
        }
    }

    public isValidField(field: string): boolean {
        return this.formProduct.controls[field].errors
        && this.formProduct.controls[field].touched;
    }

    public getError(field: string): string | null {
        const errors = this.utilsService.getFieldErrors(this.formProduct, field);
        return errors;
    }

    public getCategories(): void {
        this.categoryService.getAll().pipe(
            map( categories => categories.map(({name}) => name)),
            map( names => names as Category[]),
        ).subscribe(categories =>  this.categories = categories)
    }
 }
