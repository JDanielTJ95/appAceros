import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

    //Message dialog
    public SUCCESS = 'success';
    public SUCCESSFUL = 'successful';
    public ERROR = 'error';
    public ERROR2 = 'Error';
    public WARN = 'warn';
    public WARN2 = 'Warn';
    public TIME_MESSAGE = 3000;

    constructor() { }
}
