import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDashboardAttendanceComponent } from './driver-dashboard-attendance.component';

describe('DriverDashboardAttendanceComponent', () => {
  let component: DriverDashboardAttendanceComponent;
  let fixture: ComponentFixture<DriverDashboardAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDashboardAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDashboardAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
