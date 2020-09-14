import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRideComponent } from './customer-ride.component';

describe('CustomerRideComponent', () => {
  let component: CustomerRideComponent;
  let fixture: ComponentFixture<CustomerRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
