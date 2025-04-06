import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';

import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { InputService } from 'src/app/appAceros/service/input.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/appAceros/service/product.service';
import { UtilsService } from 'src/app/appAceros/service/utils.service';

import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { fadeInOut } from 'src/app/shared/animations/general-animations';
import { IInput } from 'src/app/appAceros/Interfaces/input';
import { Input } from 'src/app/appAceros/models/input.model';
import { IProduct } from 'src/app/appAceros/Interfaces/product';
import { Product } from 'src/app/appAceros/models/product.model';

@Component({
  selector: 'app-input-create',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ButtonModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
  ],
  providers: [ MessageService ],
  animations: [ fadeInOut ],
  templateUrl: './input-create.component.html',
  styleUrl: './input-create.component.scss'
})
export class InputCreateComponent implements OnInit{

    public title: string = 'Nueva Entrada'
    public products: Product[] = [];
    public showComponent: boolean = true;
    public isSaveInput: boolean = false;
    public isSaveProduct: boolean = false;
    public formInput: FormGroup = this.formBuilder.group({
        id: [''],
        product: ['',[Validators.required]],
        amount: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
        date: [''],
    });

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private inputService: InputService,
        private messageService: MessageService,
        private constService: ConstantsService,
        private utilsService: UtilsService,
    ){}

    ngOnInit(): void {
        this.getProducts();
    }

    public onSubmitSave(){
       this.saveInput();
       this.saveProduct();
       if(!this.isSaveInput && !this.isSaveProduct){
            this.messageService.add({
                severity: this.constService.SUCCESS,
                summary: this.constService.SUCCESSFUL,
                detail: 'Entrada Registrada',
                life: this.constService.TIME_MESSAGE
            });
        }else{
            this.messageService.add({
                severity: this.constService.ERROR,
                summary: this.constService.ERROR2,
                detail: 'Ocurrio un error',
                life: this.constService.TIME_MESSAGE
            });
        }
        this.utilsService.timeOut('/inputs');
    }

    public get currentInput(): Input{
        return this.formInput.value as Input;
    }

    private saveInput(): void{
        this.inputService
            .createInput( this.getInput() )
            .subscribe({
                next: response => this.isSaveInput = response,
                error: err => console.log(err),
            });
    }

    private saveProduct(): void{
        this.productService
            .updateProduct( this.getProduct() )
            .subscribe({
                next: response => this.isSaveProduct = response,
                error: err => console.log(err),
            })
    }

    private getInput(): IInput{
        return {
            id: '',
            product: this.currentInput.product.id,
            amount: this.currentInput.amount,
            date: new Date,
        }
    }

    private getProduct(): IProduct{
        const currentStock = this.currentInput.product.stock;
        const amount = this.currentInput.amount;
        const newStock = currentStock + Number(amount);
        return {
            id: this.currentInput.product.id,
            name: this.currentInput.product.name,
            description: this.currentInput.product.description,
            size: this.currentInput.product.size,
            category: this.currentInput.product.category.id,
            available: newStock > 0 ? true : false,
            stock: newStock,
            price: this.currentInput.product.price,
            totalPrice: newStock * this.currentInput.product.price,
        }
    }

    private getProducts(): void{
        this.productService
            .getAll()
            .subscribe({
                next: response => this.products = response,
                error: err => console.error(err)
            });
    }
}
