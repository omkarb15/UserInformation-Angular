import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoWithFlyerComponent } from './user-info-with-flyer.component';

describe('UserInfoWithFlyerComponent', () => {
  let component: UserInfoWithFlyerComponent;
  let fixture: ComponentFixture<UserInfoWithFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoWithFlyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoWithFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
