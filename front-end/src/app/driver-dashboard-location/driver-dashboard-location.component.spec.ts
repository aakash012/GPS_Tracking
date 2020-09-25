import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDashboardLocationComponent } from './driver-dashboard-location.component';

describe('DriverDashboardLocationComponent', () => {
  let component: DriverDashboardLocationComponent;
  let fixture: ComponentFixture<DriverDashboardLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDashboardLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDashboardLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
