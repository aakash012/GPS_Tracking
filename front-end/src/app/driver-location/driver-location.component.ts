import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { TaxiDriver } from '../taxi-driver';
import { TaxiDriverService } from '../taxi-driver.service';


@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.component.html',
  styleUrls: ['./driver-location.component.css'],
})
export class DriverLocationComponent {
  latitude:number = 31.6340;
  longitude:number = 74.8723;
  taxiDriverList:TaxiDriver[];
  constructor(private taxiDriverService: TaxiDriverService) { }

  ngOnInit(): void {
    this.getAllTaxiDriver();
  }

  getAllTaxiDriver() {
    this.taxiDriverService.getAllTaxiDriver().subscribe((data: TaxiDriver[]) => {
      this.taxiDriverList = data;
    });
  }
}
