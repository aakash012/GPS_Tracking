import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { TaxiDriver } from '../taxi-driver';
import { CustomerRideService } from '../customer-ride.service';
import { TaxiDriverService } from '../taxi-driver.service';

@Component({
  selector: 'app-driver-dashboard-rides',
  templateUrl: './driver-dashboard-rides.component.html',
  styleUrls: ['./driver-dashboard-rides.component.css']
})
export class DriverDashboardRidesComponent implements OnInit {

  rideList: CustomerRide[];
  driverId:any;

  constructor(private customerRideService: CustomerRideService) { }

  ngOnInit(): void {
    this.driverId = localStorage.getItem("DriverId");
    this.getCustomerRideByDriverId(this.driverId );
  }

  getCustomerRideByDriverId(DriverId:number) {
    this.customerRideService.getCustomerRideByDriverId(DriverId).subscribe((data: CustomerRide[]) => {
      this.rideList = data;
    });
  }

}
