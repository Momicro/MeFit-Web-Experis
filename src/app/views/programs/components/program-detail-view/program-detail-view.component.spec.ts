import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDetailViewComponent } from './program-detail-view.component';

describe('ProgramDetailViewComponent', () => {
  let component: ProgramDetailViewComponent;
  let fixture: ComponentFixture<ProgramDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
