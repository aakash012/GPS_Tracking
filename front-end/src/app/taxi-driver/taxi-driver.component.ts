import { Component, OnInit } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { Driver } from '../drivers';
import { DriversService } from '../drivers.service';
import { TaxiDriver } from '../taxi-driver';
import { TaxiDriverService } from '../taxi-driver.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-taxi-driver',
  templateUrl: './taxi-driver.component.html',
  styleUrls: ['./taxi-driver.component.css']
})
export class TaxiDriverComponent implements OnInit {

  taxiList: Taxi[];
  driverList:Driver[];
  taxiDriverList:TaxiDriver[];
  taxiDriverForm:any;
  constructor(private formbulider: FormBuilder, private taxiService: TaxiService,private driverService: DriversService,private taxiDriverService: TaxiDriverService) { }

  ngOnInit(): void {

    this.taxiDriverForm = this.formbulider.group({
      TaxiId: ['0', [Validators.required]],
      DriverId: ['0', [Validators.required]]
      

    });

    this.getTaxiDetails();
    this.getDriverDetails();
    this.getTaxiDriverDetails();
  }

  getTaxiDetails() {
    this.taxiService.getAllTaxi().subscribe((data: Taxi[]) => {
      this.taxiList = data;
    });
  }

  getDriverDetails() {
    this.driverService.getAllDriver().subscribe((data: Driver[]) => {
      this.driverList = data;
    });
  }
  getTaxiDriverDetails() {
    this.taxiDriverService.getAllTaxiDriver().subscribe((data: TaxiDriver[]) => {
      this.taxiDriverList = data;
    });
  }

  onFormSubmit()
  {
    const taxiDriver=this.taxiDriverForm.value;
    this.CreateTaxiDriver(taxiDriver);
  }

  CreateTaxiDriver(taxiDriver:TaxiDriver) {
// if (this.taxiUpdate == null) {
      this.taxiDriverService.saveTaxiDriver(taxiDriver).subscribe(() => {
        this.getTaxiDriverDetails();
      });
    //}
    // else{
    //   this.taxiService.updateTaxi(taxi).subscribe(() => {
    //     this.taxiUpdate = null;
    //     this.ResetForm();
    //   });
    // }

  }
}
