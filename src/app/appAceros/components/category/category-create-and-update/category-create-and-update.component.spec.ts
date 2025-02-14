import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreateAndUpdateComponent } from './category-create-and-update.component';

describe('CategoryCreateAndDeleteComponent', () => {
  let component: CategoryCreateAndUpdateComponent;
  let fixture: ComponentFixture<CategoryCreateAndUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCreateAndUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreateAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
