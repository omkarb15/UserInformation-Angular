import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxesComponent } from './check-boxes.component';

describe('CheckBoxesComponent', () => {
  let component: CheckBoxesComponent;
  let fixture: ComponentFixture<CheckBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckBoxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
