import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCreateComponent } from './output-create.component';

describe('OutputCreateComponent', () => {
  let component: OutputCreateComponent;
  let fixture: ComponentFixture<OutputCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutputCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
