import { Component, OnInit } from '@angular/core';
import { Taxi } from '../taxi';
import { TaxiService } from '../taxi.service';
import { Driver } from '../drivers';
import { DriversService } from '../drivers.service';
import { TaxiDriver } from '../taxi-driver';
import { TaxiDriverService } from '../taxi-driver.service';
import { Locations } from '../locations';
import { LocationsService } from '../locations.service';
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
  locationsList : Locations[];

  constructor(private formbulider: FormBuilder, private taxiService: TaxiService,private driverService: DriversService,private taxiDriverService: TaxiDriverService,private locationsService: LocationsService) { }

  ngOnInit(): void {

    this.taxiDriverForm = this.formbulider.group({
      TaxiId: ['0', [Validators.required]],
      DriverId: ['0', [Validators.required]],
      CurrentLocationId: ['0', [Validators.required]]

    });

    this.getTaxiDetails();
    this.getDriverDetails();
    this.getTaxiDriverDetails();
    this.getAllLocations();
  }

  getTaxiDetails() {
    this.taxiService.getAllTaxiForDropDown().subscribe((data: Taxi[]) => {
      this.taxiList = data;
    });
  }

  getDriverDetails() {
    this.driverService.getAllDriverForDropDown().subscribe((data: Driver[]) => {
      this.driverList = data;
    });
  }
  getTaxiDriverDetails() {
    this.taxiDriverService.getAllTaxiDriver().subscribe((data: TaxiDriver[]) => {
      this.taxiDriverList = data;
    });
  }

  getAllLocations() {
    this.locationsService.getAllLocations().subscribe((data: Locations[]) => {
      this.locationsList = data;
      
    });
  }


  onFormSubmit()
  {
    const taxiDriver=this.taxiDriverForm.value;
    this.CreateTaxiDriver(taxiDriver);
  }

  CreateTaxiDriver(taxiDriver:TaxiDriver) {

      this.taxiDriverService.saveTaxiDriver(taxiDriver).subscribe(() => {
        
         this.getTaxiDetails();
         this.getDriverDetails();
         this.getTaxiDriverDetails();
      });
   
  }
}
