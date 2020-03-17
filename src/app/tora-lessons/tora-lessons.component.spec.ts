import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToraLessonsComponent } from './tora-lessons.component';

describe('ToraLessonsComponent', () => {
  let component: ToraLessonsComponent;
  let fixture: ComponentFixture<ToraLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToraLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToraLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
