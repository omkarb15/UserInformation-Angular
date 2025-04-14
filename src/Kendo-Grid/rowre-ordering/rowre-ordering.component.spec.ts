import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowreOrderingComponent } from './rowre-ordering.component';

describe('RowreOrderingComponent', () => {
  let component: RowreOrderingComponent;
  let fixture: ComponentFixture<RowreOrderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowreOrderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowreOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
