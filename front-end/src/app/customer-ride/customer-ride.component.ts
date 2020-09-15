import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { Driver } from '../drivers';
import { CustomerRideService } from '../customer-ride.service';
import { DriversService } from '../drivers.service';

@Component({
  selector: 'app-customer-ride',
  templateUrl: './customer-ride.component.html',
  styleUrls: ['./customer-ride.component.css']
})
export class CustomerRideComponent implements OnInit {

  rideList: CustomerRide[];
  driverList:Driver[];
  rideForm: any;
  rideUpdate = null;
  constructor(private formbulider: FormBuilder, private customerRideService: CustomerRideService,private driverService: DriversService) { }

  ngOnInit(): void {
    this.rideForm = this.formbulider.group({
      CustomerRideId: ['0'],
      CustomerName: ['', [Validators.required]],
      PickupLocation: ['', [Validators.required]],
      DropLocation: ['', [Validators.required]],
      TaxiDriverId: ['0']
    });

    this.getRideDetails();
  }
  getRideDetails() {
    this.customerRideService.getAllCustomerRide().subscribe((data: CustomerRide[]) => {
      this.rideList = data;
    });
  }

  getDriverDetails() {
    this.driverService.getAllDriver().subscribe((data: Driver[]) => {
      this.driverList = data;
    });
  }


  onFormSubmit() {
    const ride = this.rideForm.value;
   // alert(ride);
    this.CreateRide(ride);
    this.getRideDetails();
  }
  FillRideFormToEdit(CustomerRideId: number) {
    this.customerRideService.getCustomerRideById(CustomerRideId).subscribe(Rides => {
      this.rideForm.controls['CustomerRideId'].setValue(Rides.CustomerRideId);
      this.rideForm.controls['PickupLocation'].setValue(Rides.PickupLocation);
      this.rideForm.controls['DropLocation'].setValue(Rides.DropLocation);
      // this.rideForm.controls['DriverList'].setValue(Rides.DriverList, { onlySelf: true });
    });
  }
  CreateRide(ride: CustomerRide) {
    
      this.customerRideService.approveCustomerRide(ride).subscribe(() => {
        this.getRideDetails();
        this.ResetForm();
      });
    

  }
ResetForm() {
  this.rideForm.reset();

}
}
