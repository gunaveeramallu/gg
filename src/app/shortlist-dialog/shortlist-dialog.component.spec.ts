import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistDialogComponent } from './shortlist-dialog.component';

describe('ShortlistDialogComponent', () => {
  let component: ShortlistDialogComponent;
  let fixture: ComponentFixture<ShortlistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
