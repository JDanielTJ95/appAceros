import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    public formSubmitted = false;

    public registerForm = this.fb.group({
        email: ['test100@mail.com', [Validators.required, Validators.email ] ],
        password: ['123436', Validators.required ],
    });

    login() {
        this.router.navigateByUrl('/');
    }

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private fb: FormBuilder) { }
}
