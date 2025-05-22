import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmChartComponent } from './am-chart.component';

describe('AmChartComponent', () => {
  let component: AmChartComponent;
  let fixture: ComponentFixture<AmChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
