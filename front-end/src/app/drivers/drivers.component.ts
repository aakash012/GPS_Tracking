import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Driver } from '../drivers';
import { DriversService } from '../drivers.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  dataSaved = false;
  driverForm: any;
  allDrivers: Observable<Driver[]>;
  driverIdUpdate = null;
  message = null;
  constructor(
    private formbulider: FormBuilder,
    private driverService: DriversService
  ) {}

  ngOnInit(): void {
    this.driverForm = this.formbulider.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      license: ['', [Validators.required]],
    });

    this.allDrivers = this.driverService.getAllDriver();
  }
  loadDriverToEdit(driverId: string) {
    this.driverService.getDriverById(driverId).subscribe((driver) => {
      debugger;
      this.message = null;
      this.dataSaved = false;
      this.driverIdUpdate = driver.driverId;
      this.driverForm.controls['name'].setValue(driver.name);
      this.driverForm.controls['gender'].setValue(driver.gender, {
        onlySelf: true,
      });
      this.driverForm.controls['contact'].setValue(driver.contact);
      this.driverForm.controls['license'].setValue(driver.license);
    });
  }
  CreateDriver(driver: Driver) {
    if (this.driverIdUpdate == null) {
      this.driverService.createDriver(driver).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record saved Successfully';
        this.driverIdUpdate = null;
        this.driverForm.reset();
      });
    } else {
      driver.driverId = this.driverIdUpdate;
      this.driverService.updateDriver(driver).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.driverIdUpdate = null;
        this.driverForm.reset();
      });
    }
  }
  deleteDriver(driverId: string) {
    if (confirm('Are you sure you want to delete this ?')) {
      debugger;
      this.driverService.deleteDriverById(driverId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Deleted Succefully';
        //this.loadAllEmployees();
        this.driverIdUpdate = null;
        this.driverForm.reset();
      });
    }
  }
}
