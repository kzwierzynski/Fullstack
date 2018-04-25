import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdivComponent } from './logdiv.component';

describe('LogdivComponent', () => {
  let component: LogdivComponent;
  let fixture: ComponentFixture<LogdivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogdivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogdivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
