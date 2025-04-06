import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { IProduct } from 'src/app/appAceros/Interfaces/product';

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
export class ProductsFormComponent implements OnInit, OnChanges{

    @Input()
    public product?: Product;
    @Output()
    public selectedProduct = new EventEmitter<IProduct>();
    public sizes: Size[] | undefined;
    public categories: Category[] = [];
    public formProduct: FormGroup = this.formBuilder.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
        category: ['', [Validators.required]],
        stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        totalPrice: [''],
        description: ['', [Validators.required, Validators.minLength(3)]],
        available: [''],
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

    ngOnChanges(): void {
        this.formProduct.reset(this.product[0]);
    }

    public onSubmitSave(): void {
        const product: IProduct = {
            id: this.currentProduct.id,
            name: this.currentProduct.name,
            price: this.currentProduct.price,
            category: this.currentProduct.category.id,
            stock: this.currentProduct.stock,
            totalPrice: this.currentProduct.stock * this.currentProduct.price,
            description: this.currentProduct.description,
            available: this.currentProduct.stock > 0 ? true : false,
            size: this.currentProduct.size,
        }
        this.selectedProduct.emit(product);
    }

    public isValidField(field: string): boolean {
        return this.formProduct.controls[field].errors
        && this.formProduct.controls[field].touched;
    }

    public getError(field: string): string | null {
        const errors = this.utilsService.getFieldErrors(this.formProduct, field);
        return errors;
    }

    private getCategories(): void {
        this.categoryService
            .getAll()
            .subscribe(categories => this.categories = categories)
    }

    private get currentProduct(): Product{
        return this.formProduct.value as Product;
    }
 }
