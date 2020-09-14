import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-driver-location',
  templateUrl: './driver-location.component.html',
  styleUrls: ['./driver-location.component.css'],
})
export class DriverLocationComponent {

  latitude = 28.5355;
  longitude = 77.3910;

  latitude1 = 28.56;
  longitude2 = 77.43;
  locationChosen = true;

  // onChoseLocation(event) {
  //   this.latitude = event.coords.lat;
  //   this.longitude = event.coords.lng;
  //   this.locationChosen = false;
  //}

}
