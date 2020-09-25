import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { LocationsService } from '../locations.service';
import { CustomerRideService } from '../customer-ride.service';

@Component({
  selector: 'app-driver-dashboard-location',
  templateUrl: './driver-dashboard-location.component.html',
  styleUrls: ['./driver-dashboard-location.component.css']
})
export class DriverDashboardLocationComponent implements OnInit {
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  userType: any;
  driverId: any;
  driverName: any;
  lat: number;
  lng: number;
  dropLat: number;
  dropLng: number;
  pickUpLat: number;
  pickUpLng: number;
  taxiLat: number;
  taxiLng: number;
  pickUpId: number;
  dropId: number;
  latitude: any;
  longitude: any;
  getAddress: any;
  zoom: number;
  rideClick: boolean = true;
  taxiLocation: boolean = true;
  directionFlag: boolean = false;
  customerLocation: boolean = false;
  currentRideList: any;
  customerName:String;
  currentRide:boolean = false;

  constructor(private router: Router, private apiloader: MapsAPILoader, private locationsService: LocationsService, private customerRideService: CustomerRideService) { }

  ngOnInit(): void {
    this.get();
    this.agmMap.triggerResize(true);
    this.zoom = 16;
    this.driverId = localStorage.getItem("DriverId");
    this.driverName = localStorage.getItem("DriverName");

    this.getDriverLocation(this.driverId);
    this.getCustomerRideByDriverId(this.driverId);
    if (this.driverId == null) {
      this.router.navigate(['login']);
    }

  }

  get() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress = (this.lat, this.lng)
          console.log(position)
          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = {
              lat: this.lat,
              lng: this.lng
            };
            geocoder.geocode({
              'location': latlng
            }, function (results) {
              console.log(latlng);
              console.log(results);
              if (results[0]) {
                this.currentLocation = results[0].formatted_address;
                console.log(this.assgin);
              } else {
                console.log('Not found');
              }

            });
          });
        }
      })
    }
  }

  mapClicked($event: any) {
    this.latitude = $event.coords.lat,
      this.longitude = $event.coords.lng
    this.apiloader.load().then(() => {
      let geocoder = new google.maps.Geocoder;
      let latlng = {
        lat: this.latitude,
        lng: this.longitude
      };
      geocoder.geocode({
        'location': latlng
      }, function (results) {
        if (results[0]) {
          this.currentLocation = results[0].formatted_address;
          console.log(this.currentLocation);
        } else {
          console.log('Not found');
        }
      });
    });
  }

  dir = undefined;
  public getDirection() {
    this.dir = {
      origin: { lat: this.pickUpLat, lng: this.pickUpLng },
      destination: { lat: this.dropLat, lng: this.dropLng }
    }
  }

  getDriverLocation(DriverId: number) {
    this.locationsService.getDriverLocation(DriverId).subscribe(data => {

      this.taxiLat = data.CurrentLatitude;
      this.taxiLng = data.CurrentLongitude;
      this.lat = data.CurrentLatitude;
      this.lng = data.CurrentLongitude;

    });
  }


  getCustomerRideByDriverId(DriverId: number) {
    this.locationsService.getCustomerRideByDriverId(DriverId).subscribe(data => {

      if(data["RideStatus"] == 1){
        
        this.taxiLocation = true;
        this.directionFlag = true;
        this.pickUpLat = data["PickupLatitude"];
        this.pickUpLng = data["PickupLongitude"];
        this.dropLat = data["DropLatitude"];
        this.dropLng = data["DropLongitude"];
        this.currentRide = true;
        this.getDirection();
        this.currentRideList=data;
      }
      else{
        this.directionFlag = false;
        this.customerLocation =false;
        this.currentRide = false;
      }

    });
  }

}
