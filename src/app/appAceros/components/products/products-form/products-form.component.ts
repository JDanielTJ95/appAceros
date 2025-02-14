import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormRecord, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Product } from 'src/app/appAceros/models/product.model';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    RouterLink,
    TagModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {

    @Input()
    public product?: Product | undefined;
    @Output()
    public selectedProduct = new EventEmitter<Product>();
    public formProduct: FormRecord = this.formBuilder.group({
        id: [''],
        name: ['', [Validators.required, Validators.maxLength(3)]],
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
    ) {}

    public onSubmitSave(): void {
        console.log('funciona');
    }
}
