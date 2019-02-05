import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdriveComponent } from './newdrive.component';

describe('NewdriveComponent', () => {
  let component: NewdriveComponent;
  let fixture: ComponentFixture<NewdriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
