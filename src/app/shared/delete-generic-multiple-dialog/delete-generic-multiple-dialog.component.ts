import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete-generic-multiple-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
  ],
  templateUrl: './delete-generic-multiple-dialog.component.html',
  styleUrl: './delete-generic-multiple-dialog.component.scss'
})
export class DeleteGenericMultipleDialogComponent {
    @Input()
    public dialog: boolean = false;
    @Input()
    public object: string = '';
    @Output()
    public isConfirmDelete = new EventEmitter<boolean>();

    constructor() {}

    public confirmDeleteSelected(): void {
        this.isConfirmDelete.emit(true);
        this.dialog = false;
    }

    public cancelDeleteSelected(): void {
        this.isConfirmDelete.emit(false);
        this.dialog = false;
    }
}
