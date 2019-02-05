import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyJobWindowComponent } from './apply-job-window.component';

describe('ApplyJobWindowComponent', () => {
  let component: ApplyJobWindowComponent;
  let fixture: ComponentFixture<ApplyJobWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyJobWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyJobWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
