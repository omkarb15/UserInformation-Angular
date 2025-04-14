import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropBetGridComponent } from './drag-drop-bet-grid.component';

describe('DragDropBetGridComponent', () => {
  let component: DragDropBetGridComponent;
  let fixture: ComponentFixture<DragDropBetGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropBetGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropBetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
