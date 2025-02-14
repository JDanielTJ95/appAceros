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
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from 'src/app/appAceros/service/product.service';

@Component({
  selector: 'app-products-edit',
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
  templateUrl: './products-edit.component.html',
  styleUrl: './products-edit.component.scss'
})
export class ProductsEditComponent implements OnInit {

    public product: Product = {};
    public showComponent: boolean = true;

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private constService: ConstantsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(param => {
                if (param.get('id') === '')
                    return of([]);
                return this.productService.getProductById(param.get('id'));
            }),
            map((response): Product => response['product']),
            catchError(error => {
                this.messageService.add({
                    severity: this.constService.ERROR,
                    summary: this.constService.ERROR2,
                    detail: error.message
                });
                setTimeout(() =>
                    this.router.navigate(['/products']),
                    this.constService.TIME_MESSAGE
                );
                return of([]);
            })
        ).subscribe(response => this.product = {...response as Product});
    }

    public onSubmitSave(): void {}

    public editCategory(): void {}

}
