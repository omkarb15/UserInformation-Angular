import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuitInDirectiveBindingComponent } from './buit-in-directive-binding.component';

describe('BuitInDirectiveBindingComponent', () => {
  let component: BuitInDirectiveBindingComponent;
  let fixture: ComponentFixture<BuitInDirectiveBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuitInDirectiveBindingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuitInDirectiveBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
