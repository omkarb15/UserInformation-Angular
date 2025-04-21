import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartIntegrationComponent } from './chart-integration.component';

describe('ChartIntegrationComponent', () => {
  let component: ChartIntegrationComponent;
  let fixture: ComponentFixture<ChartIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartIntegrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
