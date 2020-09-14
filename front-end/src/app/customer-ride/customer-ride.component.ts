import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Rides } from '../rides';
import { RideService } from '../ride.service';

@Component({
  selector: 'app-customer-ride',
  templateUrl: './customer-ride.component.html',
  styleUrls: ['./customer-ride.component.css']
})
export class CustomerRideComponent implements OnInit {

  rideList: Rides[];
  rideForm: any;
  rideUpdate = null;
  constructor(private formbulider: FormBuilder, private RideService: RideService) { }

  ngOnInit(): void {
    this.rideForm = this.formbulider.group({
      RideId: ['0'],
      CustomerName: ['', [Validators.required]],
      PickUpLocation: ['', [Validators.required]],
      DropLocation: ['', [Validators.required]],
      RideList: [1, [Validators.required]],
    });

    this.getRideDetails();
  }
  getRideDetails() {
    this.RideService.getAllRides().subscribe((data: Rides[]) => {
      this.rideList = data;
    });
  }
  onFormSubmit() {
    const ride = this.rideForm.value;
   // alert(ride);
    this.CreateRide(ride);
    this.getRideDetails();
  }
  FillRideFormToEdit(RideId: number) {
    this.RideService.getRideById(RideId).subscribe(Rides => {
      this.rideUpdate = Rides.RideId;
      this.rideForm.controls['RideId'].setValue(Rides.RideId);
      this.rideForm.controls['PickUpLocation'].setValue(Rides.PickUpLocation);
      this.rideForm.controls['DropLocation'].setValue(Rides.DropLocation);
      this.rideForm.controls['DriverList'].setValue(Rides.DriverList, { onlySelf: true });
    });
  }
  CreateRide(ride: Rides) {
    if (this.rideUpdate == null) {
      this.RideService.saveRide(ride).subscribe(() => {
        this.rideUpdate = null;
        this.ResetForm();
      });
    }
    else{
      this.RideService.updateRide(ride).subscribe(() => {
        this.rideUpdate = null;
        this.ResetForm();
      });
    }
  }
ResetForm() {
  this.rideForm.reset();

}
}
