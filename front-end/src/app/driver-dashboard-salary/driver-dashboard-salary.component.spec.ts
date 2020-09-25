import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDashboardSalaryComponent } from './driver-dashboard-salary.component';

describe('DriverDashboardSalaryComponent', () => {
  let component: DriverDashboardSalaryComponent;
  let fixture: ComponentFixture<DriverDashboardSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDashboardSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDashboardSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
