import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRideTrackComponent } from './customer-ride-track.component';

describe('CustomerRideTrackComponent', () => {
  let component: CustomerRideTrackComponent;
  let fixture: ComponentFixture<CustomerRideTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRideTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRideTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
