import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { CustomerRideService } from '../customer-ride.service';

@Component({
  selector: 'app-customer-ride',
  templateUrl: './customer-ride.component.html',
  styleUrls: ['./customer-ride.component.css']
})
export class CustomerRideComponent implements OnInit {

  rideList: CustomerRide[];
  rideForm: any;
  rideUpdate = null;
  constructor(private formbulider: FormBuilder, private customerRideService: CustomerRideService) { }

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
    // if (this.rideUpdate == null) {
      this.customerRideService.saveCustomerRide(ride).subscribe(() => {
        this.rideUpdate = null;
        this.ResetForm();
      });
    // /}

  }
ResetForm() {
  this.rideForm.reset();

}
}
