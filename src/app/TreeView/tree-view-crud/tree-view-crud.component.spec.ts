import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewCrudComponent } from './tree-view-crud.component';

describe('TreeViewCrudComponent', () => {
  let component: TreeViewCrudComponent;
  let fixture: ComponentFixture<TreeViewCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeViewCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeViewCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
