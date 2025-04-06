import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Size } from '../enums/size.enums';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    private _sizes: Size[] = [ Size.s, Size.m, Size.l, Size.xl ]

    constructor(
        private router: Router,
        private constService: ConstantsService,
    ) {}

    public getFieldErrors(form: FormGroup, field: string): string | null {
        if (!form.controls[field]) return null;
        const errors = form.controls[field].errors || {};
        for (const key of Object.keys(errors)) {
            switch (key){
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
            }
        }

        return null;
    }

    public getSizes(): Size[] {
        return [ ...this._sizes ];
    }

    public timeOut(path: string): void{
        setTimeout(
            () => this.router.navigate([path]),
            this.constService.TIME_MESSAGE
        );

    }
}
