import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDetailViewComponent } from './goal-detail-view.component';

describe('GoalDetailViewComponent', () => {
  let component: GoalDetailViewComponent;
  let fixture: ComponentFixture<GoalDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
