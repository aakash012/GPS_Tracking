import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Driver } from '../drivers';
import { DriversService } from '../drivers.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  driverList: Driver[];
  driverForm: any;
  driverUpdate = null;

  constructor(private formbulider: FormBuilder, private driverService: DriversService) { }

  ngOnInit(): void {

    this.driverForm = this.formbulider.group({
      driverId: ['0'],
      DriverName: ['', [Validators.required]],
      Gender: [1, [Validators.required]],
      ContactNo: ['', [Validators.required]],
      BasicSalary: ['', [Validators.required]],
      WagePerRide: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
      DrivingLicence: ['', [Validators.required]]

    });

    this.getDriverDetails();
  }

  getDriverDetails() {
    this.driverService.getAllDriver().subscribe((data: Driver[]) => {
      this.driverList = data;
    });
  }

  onFormSubmit() {
    const driver = this.driverForm.value;
    this.CreateDriver(driver);
   
  }

  FillDriverFormToEdit(DriverId: number) {
    this.driverService.getDriverById(DriverId).subscribe(Driver => {
      this.driverUpdate = Driver.DriverId;
      this.driverForm.controls['driverId'].setValue(Driver.DriverId);
      this.driverForm.controls['DriverName'].setValue(Driver.DriverName);
      this.driverForm.controls['Gender'].setValue(Driver.Gender, { onlySelf: true });
      this.driverForm.controls['ContactNo'].setValue(Driver.ContactNo);
      this.driverForm.controls['DrivingLicence'].setValue(Driver.DrivingLicence);
      this.driverForm.controls['BasicSalary'].setValue(Driver.BasicSalary);
      this.driverForm.controls['WagePerRide'].setValue(Driver.WagePerRide);
    });

  }

  CreateDriver(driver: Driver) {
    if (this.driverUpdate == null) {
      this.driverService.saveDriver(driver).subscribe(() => {
        this.driverUpdate = null;
        this.ResetForm();
        this.getDriverDetails();
      });
    }
    else{
      this.driverService.updateDriver(driver).subscribe(() => {
        this.driverUpdate = null;
        this.ResetForm();
        this.getDriverDetails();
      });
    }
  }

  DeleteDriver(DriverId: number) {
    if (confirm("Are you sure you want to delete this ?")) {

      this.driverService.deleteDriverById(DriverId).subscribe(data => {
        if(data == 0)
        {
          alert("Cannot Delete Driver as Driver is assigned to a Taxi");
        }
        this.driverUpdate = null;
        this.getDriverDetails();
      });
    }

  }

ResetForm() {
  this.driverForm.reset();

}
}
