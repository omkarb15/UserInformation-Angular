import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartsComponent } from './pie-charts.component';

describe('PieChartsComponent', () => {
  let component: PieChartsComponent;
  let fixture: ComponentFixture<PieChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
