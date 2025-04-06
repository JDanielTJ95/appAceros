import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';

import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { InputService } from 'src/app/appAceros/service/input.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/appAceros/service/product.service';
import { UtilsService } from 'src/app/appAceros/service/utils.service';

import { RouterLink } from '@angular/router';
import { fadeInOut } from 'src/app/shared/animations/general-animations';
import { Product } from 'src/app/appAceros/models/product.model';
import { IProduct } from 'src/app/appAceros/Interfaces/product';
import { IOutput } from 'src/app/appAceros/Interfaces/output';
import { OutputService } from 'src/app/appAceros/service/output.service';
import { Output } from 'src/app/appAceros/models/output.model';

@Component({
  selector: 'app-output-create',
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
  templateUrl: './output-create.component.html',
  styleUrl: './output-create.component.scss'
})
export class OutputCreateComponent implements OnInit{

    public title: string = 'Nueva Salida'
    public products: Product[] = [];
    public showComponent: boolean = true;
    public isSaveOutput: boolean = false;
    public isSaveProduct: boolean = false;
    public formOutput: FormGroup = this.formBuilder.group({
        id: [''],
        product: ['',[Validators.required]],
        amount: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
        date: [''],
    });

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private outputService: OutputService,
        private messageService: MessageService,
        private constService: ConstantsService,
        private utilsService: UtilsService,
    ){}

    ngOnInit(): void {
        this.getProducts();
    }

    public onSubmitSave(){
        if(!this.validateAmount()){
            return;
        }
        this.saveOutput();
        this.saveProduct();
        if(!this.isSaveOutput && !this.isSaveProduct){
            this.messageService.add({
                severity: this.constService.SUCCESS,
                summary: this.constService.SUCCESSFUL,
                detail: 'Salida Registrada',
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
        this.utilsService.timeOut('/outputs');
    }

    public get currentOutput(): Output{
        return this.formOutput.value as Output;
    }

    private validateAmount(): boolean {
        const stock: number = this.currentOutput.product.stock;
        const amount: number = Number(this.currentOutput.amount);
        const result: boolean = stock - amount >= 0 ? true : false;

        if(result) return true;

        this.messageService.add({
            severity: this.constService.WARN,
            summary: this.constService.WARN2,
            detail: 'Stock Insuficiente',
            life: this.constService.TIME_MESSAGE
        });
        return false;
    }

    private saveOutput(): void{
        this.outputService
            .createOutput( this.getOutput() )
            .subscribe({
                next: response => this.isSaveOutput = response,
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

    private getOutput(): IOutput{
        return {
            id: '',
            product: this.currentOutput.product.id,
            amount: this.currentOutput.amount,
            date: new Date,
        }
    }

    private getProduct(): IProduct{
        const currentStock = this.currentOutput.product.stock;
        const amount = this.currentOutput.amount;
        const newStock = currentStock - Number(amount);
        return {
            id: this.currentOutput.product.id,
            name: this.currentOutput.product.name,
            description: this.currentOutput.product.description,
            size: this.currentOutput.product.size,
            category: this.currentOutput.product.category.id,
            available: newStock > 0 ? true : false,
            stock: newStock,
            price: this.currentOutput.product.price,
            totalPrice: newStock * this.currentOutput.product.price,
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
