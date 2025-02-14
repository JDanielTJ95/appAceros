import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGenericMultipleDialogComponent } from './delete-generic-multiple-dialog.component';

describe('DeleteGenericMultipleDialogComponent', () => {
  let component: DeleteGenericMultipleDialogComponent;
  let fixture: ComponentFixture<DeleteGenericMultipleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGenericMultipleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteGenericMultipleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
