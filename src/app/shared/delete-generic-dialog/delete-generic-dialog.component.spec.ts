import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGenericDialogComponent } from './delete-generic-dialog.component';

describe('DeleteGenericDialogComponent', () => {
  let component: DeleteGenericDialogComponent;
  let fixture: ComponentFixture<DeleteGenericDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGenericDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteGenericDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
