import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionWindowComponent } from './selection-window.component';

describe('SelectionWindowComponent', () => {
  let component: SelectionWindowComponent;
  let fixture: ComponentFixture<SelectionWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
