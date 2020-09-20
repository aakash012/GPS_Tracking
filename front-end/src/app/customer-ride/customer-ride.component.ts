import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { TaxiDriver } from '../taxi-driver';
import { CustomerRideService } from '../customer-ride.service';
import { TaxiDriverService } from '../taxi-driver.service';

@Component({
  selector: 'app-customer-ride',
  templateUrl: './customer-ride.component.html',
  styleUrls: ['./customer-ride.component.css']
})
export class CustomerRideComponent implements OnInit {

  rideList: CustomerRide[];
  taxiDriverList:TaxiDriver[];
  rideForm: any;
  rideUpdate = null;
  constructor(private formbulider: FormBuilder, private customerRideService: CustomerRideService,private taxiDriverService: TaxiDriverService) { }

  ngOnInit(): void {
    this.rideForm = this.formbulider.group({
      CustomerRideId: ['0'],
      CustomerName: ['', [Validators.required]],
      PickupLocation: ['', [Validators.required]],
      DropLocation: ['', [Validators.required]],
      TaxiDriverId: ['0']
    });

    this.getRideDetails();
    this.getTaxiDriverDetails();
  }
  getRideDetails() {
    this.customerRideService.getAllCustomerRide().subscribe((data: CustomerRide[]) => {
      this.rideList = data;
    });
  }

  getTaxiDriverDetails() {
    this.taxiDriverService.getAllTaxiDriverForDropDown().subscribe((data: TaxiDriver[]) => {
      this.taxiDriverList = data;
    });
  }

  onFormSubmit() {
    const ride = this.rideForm.value;
    this.CreateRide(ride);
    
  }
  FillRideFormToEdit(CustomerRideId: number) {
    this.customerRideService.getCustomerRideById(CustomerRideId).subscribe(Rides => {
     
      this.rideForm.controls['CustomerRideId'].setValue(Rides[0].CustomerRideId);
      this.rideForm.controls['CustomerName'].setValue(Rides[0].CustomerName);
      this.rideForm.controls['PickupLocation'].setValue(Rides[0].PickupLocation);
      this.rideForm.controls['DropLocation'].setValue(Rides[0].DropLocation);
     
    });
  }
  CreateRide(ride: CustomerRide) {
    
      this.customerRideService.approveCustomerRide(ride).subscribe(() => {
        alert("Booking Request Approved");
        this.getRideDetails();
        this.ResetForm();
      });
    

  }
ResetForm() {
  this.rideForm.reset();

}
}
