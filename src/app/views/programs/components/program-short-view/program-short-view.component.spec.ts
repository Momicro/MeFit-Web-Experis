import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramShortViewComponent } from './program-short-view.component';

describe('ProgramShortViewComponent', () => {
  let component: ProgramShortViewComponent;
  let fixture: ComponentFixture<ProgramShortViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramShortViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramShortViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
