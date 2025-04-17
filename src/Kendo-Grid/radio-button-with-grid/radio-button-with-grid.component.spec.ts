import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonWithGridComponent } from './radio-button-with-grid.component';

describe('RadioButtonWithGridComponent', () => {
  let component: RadioButtonWithGridComponent;
  let fixture: ComponentFixture<RadioButtonWithGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonWithGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonWithGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
