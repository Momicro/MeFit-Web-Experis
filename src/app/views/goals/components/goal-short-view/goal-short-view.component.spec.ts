import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalShortViewComponent } from './goal-short-view.component';

describe('GoalShortViewComponent', () => {
  let component: GoalShortViewComponent;
  let fixture: ComponentFixture<GoalShortViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalShortViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalShortViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
