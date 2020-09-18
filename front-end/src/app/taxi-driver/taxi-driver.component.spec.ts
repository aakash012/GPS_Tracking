import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiDriverComponent } from './taxi-driver.component';

describe('TaxiDriverComponent', () => {
  let component: TaxiDriverComponent;
  let fixture: ComponentFixture<TaxiDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
