import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistCompanyComponent } from './shortlist-company.component';

describe('ShortlistCompanyComponent', () => {
  let component: ShortlistCompanyComponent;
  let fixture: ComponentFixture<ShortlistCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
