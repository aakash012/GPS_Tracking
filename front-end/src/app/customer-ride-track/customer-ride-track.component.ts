import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { CustomerRideService } from '../customer-ride.service';
import { Router } from '@angular/router';
import { Locations } from '../locations';
import { LocationsService } from '../locations.service';
import {} from 'googlemaps';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-ride-track',
  templateUrl: './customer-ride-track.component.html',
  styleUrls: ['./customer-ride-track.component.css']
})
export class CustomerRideTrackComponent implements OnInit {
    CustomerRide:boolean=false;
    TrackRide:boolean=true;
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;
  lat: number;
  lng: number;
  dropLat:number;
  dropLng:number;
  pickUpLat:number;
  pickUpLng:number;
  taxiLat:number;
  taxiLng:number;
  pickUpId:number;
  dropId:number;
  getAddress: any;
  zoom: number;
  latitude: any;
  longitude: any;
  customerRideForm:any;
  customerId:any;
  customerName:any;
  rideClick : boolean = true;
  taxiLocation: boolean =true;
  directionFlag: boolean = true;
  currentLocation: boolean=false;
  rideList: any;

  @Input() CustomerRideId: number;

  constructor(private router: Router,private formbulider: FormBuilder,private apiloader: MapsAPILoader,private customerRideService: CustomerRideService, private locationsService: LocationsService) {}
  get() {
    this.customerId=localStorage.getItem("CustomerId");
    this.customerName=localStorage.getItem("CustomerName");
    if(this.customerId == null)
    {
      this.router.navigate(['login']);
    }
    alert(this.CustomerRideId);
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
                    }, function(results) {
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

ngOnInit()
  {
      
    this.get()
    this.agmMap.triggerResize(true);
     this.zoom = 16;
    this.getCustomerRideById(this.CustomerRideId);

     this.customerRideForm = this.formbulider.group({
        CustomerId: [this.customerId],
        PickupLocationId: [this.dropId, [Validators.required]],
        DropLocationId: ['Jalandhar', [Validators.required]]
  
      });
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
          }, function(results) {
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

  onBack()
  {
      this.CustomerRide=true;
      this.TrackRide=false;
  }

  getCustomerRideById(CustomerRideId:number)
  {
    this.customerRideService.getCustomerRideById(CustomerRideId).subscribe((data) => {
     
      this.rideList=data;
      this.pickUpLat = data[0]["PickupLatitude"];
      this.pickUpLng = data[0]["PickupLongitude"];
      this.dropLat = data[0]["DropLatitude"];
      this.dropLng = data[0]["DropLongitude"];
      this.taxiLat = data[0]["PickupLatitude"];
      this.taxiLng = data[0]["PickupLongitude"];

      this.getDirection();

      });
  }



}
