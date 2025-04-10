import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalEditingComponent } from './external-editing.component';

describe('ExternalEditingComponent', () => {
  let component: ExternalEditingComponent;
  let fixture: ComponentFixture<ExternalEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
