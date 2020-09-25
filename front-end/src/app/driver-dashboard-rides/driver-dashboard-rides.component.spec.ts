import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDashboardRidesComponent } from './driver-dashboard-rides.component';

describe('DriverDashboardRidesComponent', () => {
  let component: DriverDashboardRidesComponent;
  let fixture: ComponentFixture<DriverDashboardRidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDashboardRidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDashboardRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
