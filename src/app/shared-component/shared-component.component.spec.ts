import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedComponentComponent } from './shared-component.component';

describe('SharedComponentComponent', () => {
  let component: SharedComponentComponent;
  let fixture: ComponentFixture<SharedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
