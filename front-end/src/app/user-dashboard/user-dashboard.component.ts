import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { CustomerRideService } from '../customer-ride.service';
import { Router } from '@angular/router';
import { Locations } from '../locations';
import { LocationsService } from '../locations.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})

export class UserDashboardComponent implements OnInit {
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
  taxiLocation: boolean =false;
  directionFlag: boolean = false;
  currentLocation: boolean=true;
  rideList: CustomerRide[];
  locationsList : Locations[];

  constructor(private router: Router,private formbulider: FormBuilder,private apiloader: MapsAPILoader,private customerRideService: CustomerRideService, private locationsService: LocationsService) {}
  get() {
    this.customerId=localStorage.getItem("CustomerId");
    this.customerName=localStorage.getItem("CustomerName");
    if(this.customerId == null)
    {
      this.router.navigate(['login']);
    }
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
     this.CheckRideCompletion(this.customerId);
     this.getRideDetails(this.customerId);
     this.getAllLocations();

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

  onBookRide() {
    const customerRide = this.customerRideForm.value;
    this.CreateCustomerRide(customerRide);

    const PickupLocationId = this.customerRideForm.controls['PickupLocationId'].value;
    // alert(PickupLocationId);
    this.getPickupLocationById(PickupLocationId);
    
    const DropLocationId = this.customerRideForm.controls['DropLocationId'].value;
    // alert(DropLocationId);
    this.getDropLocationById(DropLocationId);
  }
  
  CreateCustomerRide(customerRide: CustomerRide) {
    
      this.customerRideService.saveCustomerRide(customerRide).subscribe(() => {
       alert("Your Booking Request has been sent!!!");
       this.getDirection();
       this.rideClick=true;
       this.directionFlag=true;
       this.currentLocation=false;
       this.getRideDetails(this.customerId);
       
      });
  }

  getDropLocationById(LocationId: number) {
    this.locationsService.getLocationById(LocationId).subscribe(data => {
      
      this.dropLat=data.Latitude;
      this.dropLng=data.Longitude;

    });
  }

  getPickupLocationById(LocationId: number) {
    this.locationsService.getLocationById(LocationId).subscribe(data => {
      
      this.pickUpLat=data.Latitude;
      this.pickUpLng=data.Longitude;

    });
  }

  onRideComplete(customerRide: CustomerRide){
 
    this.customerRideService.completeCustomerRide(customerRide).subscribe(() => {
        alert("Your Ride has been completed");
        alert("Thanks for riding with us!!!");
        this.lat=this.dropLat;
        this.lng=this.dropLng;
        this.taxiLat=this.dropLat;
        this.taxiLng=this.dropLng;
        this.directionFlag=false;
        this.currentLocation=true;
        this.getDirection();
        this.getRideDetails(this.customerId);
        this.rideClick=false;
      });
  }

  getRideDetails(CustomerId: number) {
    this.customerRideService.getAllCustomerRideForUserDashBoard(CustomerId).subscribe((data: CustomerRide[]) => {
      this.rideList = data;
      
    });
  }

  getAllLocations() {
    this.locationsService.getAllLocations().subscribe((data: Locations[]) => {
      this.locationsList = data;
      
    });
  }

  CheckRideCompletion(CustomerId: number) {
    this.customerRideService.CheckRideCompletionByCustomerId(CustomerId).subscribe(data => {
      
      if(data == -1 || data ==2)
      {
        this.rideClick=false;
        
      }
      else{
        this.rideClick=true;
        this.currentLocation=false;
        this.taxiLocation=true;
        this.directionFlag=true;
        this.GetRideLocationsForDirection();
      }
      
    });
  }

  GetRideLocationsForDirection() {
    this.locationsService.getRideLocationsForDirection(this.customerId).subscribe(data => {
    
    this.pickUpLat = data["PickupLatitude"];
    this.pickUpLng = data["PickupLongitude"];
    this.dropLat = data["DropLatitude"];
    this.dropLng = data["DropLongitude"];
    this.pickUpId = data["PickupLocationId"];
    this.dropId = data["DropLocationId"];
    this.taxiLat = data["PickupLatitude"];
    this.taxiLng = data["PickupLongitude"];

    this.getDirection();
    });
  }

  onSignOut(){
      localStorage.removeItem("CustomerId");
      localStorage.removeItem("CustomerName");
    this.router.navigate(['login']);
  }

}


