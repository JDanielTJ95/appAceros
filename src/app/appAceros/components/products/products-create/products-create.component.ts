import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { Product } from 'src/app/appAceros/models/product.model';
import { ConstantsService } from 'src/app/appAceros/service/constants.service';
import { fadeInOut } from 'src/app/shared/animations/general-animations';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { ProductsFormComponent } from "../products-form/products-form.component";
import { ProductService } from 'src/app/appAceros/service/product.service';
import { IProduct } from 'src/app/appAceros/Interfaces/product';

@Component({
  selector: 'app-products-create',
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
    ProductsFormComponent
],
  providers: [ MessageService ],
  animations: [ fadeInOut ],
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.scss'
})
export class ProductsCreateComponent implements OnInit{

    public product: Product = {};
    public showComponent: boolean = true;

    constructor(
        private messageService: MessageService,
        private constService: ConstantsService,
        private router: Router,
        private productService: ProductService,
    ) {}

    ngOnInit(): void {

    }

    public onSubmitSave(product: IProduct): void {
        this.productService
            .createProduct(product)
            .subscribe({
                next: () => this.messageService.add({
                    severity: this.constService.SUCCESS,
                    summary: this.constService.SUCCESSFUL,
                    detail: 'Producto Creado',
                    life: this.constService.TIME_MESSAGE
                }),
                error: error => this.messageService.add({
                    severity: this.constService.ERROR,
                    summary: this.constService.ERROR2,
                    detail: error,
                    life: this.constService.TIME_MESSAGE
                }),
            })
        setTimeout(
            () => this.router.navigate(['/productos']),
            this.constService.TIME_MESSAGE
        );
    }

}
