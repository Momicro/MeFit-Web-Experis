import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSetViewComponent } from './goal-set-view.component';

describe('GoalSetViewComponent', () => {
  let component: GoalSetViewComponent;
  let fixture: ComponentFixture<GoalSetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalSetViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalSetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
