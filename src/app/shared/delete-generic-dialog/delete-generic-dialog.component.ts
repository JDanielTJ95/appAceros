import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete-generic-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
  ],
  templateUrl: './delete-generic-dialog.component.html',
  styleUrl: './delete-generic-dialog.component.scss'
})
export class DeleteGenericDialogComponent {

    @Input()
    public dialog: boolean = false;
    @Input()
    public object: string = '';
    @Output()
    public isConfirmDelete = new EventEmitter<boolean>();

    constructor() {}

    public confirmDelete(): void {
        this.isConfirmDelete.emit(true);
        this.dialog = false;
    }

    public cancelDelete(): void {
        this.isConfirmDelete.emit(false);
        this.dialog = false;
    }
}
