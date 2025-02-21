import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Size } from '../enums/size.enums';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    private _sizes: Size[] = [ Size.s, Size.m, Size.l, Size.xl ]

    constructor() { }

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
}
