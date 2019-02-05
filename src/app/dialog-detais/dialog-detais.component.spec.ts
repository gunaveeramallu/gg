import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetaisComponent } from './dialog-detais.component';

describe('DialogDetaisComponent', () => {
  let component: DialogDetaisComponent;
  let fixture: ComponentFixture<DialogDetaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
