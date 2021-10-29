import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailViewComponent } from './exercise-detail-view.component';

describe('ExerciseDetailViewComponent', () => {
  let component: ExerciseDetailViewComponent;
  let fixture: ComponentFixture<ExerciseDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
