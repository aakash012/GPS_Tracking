import { Directive, Input, OnChanges,  SimpleChanges,Component, OnInit, ViewChild } from '@angular/core';
import {AgmMap, MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
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
  getAddress: any;
  zoom: number;
  latitude: any;
  longitude: any;
  customerRideForm:any;
  customerId:any;
  customerName:any;
  rideClick : boolean = true;
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
        PickupLocationId: ['Amritsar', [Validators.required]],
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
    //this.CreateCustomerRide(customerRide);

    const PickupLocationId = this.customerRideForm.controls['PickupLocationId'].value;
     alert(PickupLocationId);
    this.getPickupLocationById(PickupLocationId);
    
    const DropLocationId = this.customerRideForm.controls['DropLocationId'].value;
     alert(DropLocationId);
    this.getDropLocationById(DropLocationId);
  }
  
  CreateCustomerRide(customerRide: CustomerRide) {
    
      this.customerRideService.saveCustomerRide(customerRide).subscribe(() => {
       alert("Your Booking Request has been sent!!!");
       this.rideClick=true;
       this.getRideDetails(this.customerId);
      });
  }

  getDropLocationById(LocationId: number) {
    this.locationsService.getLocationById(LocationId).subscribe(data => {
      
      this.dropLat=data.Latitude;
      this.dropLng=data.Longitude;

      this.getDirection();
      
    });
  }

  getPickupLocationById(LocationId: number) {
    this.locationsService.getLocationById(LocationId).subscribe(data => {
      
      this.pickUpLat=data.Latitude;
      this.pickUpLng=data.Longitude;

      this.getDirection();
      
    });
  }

  onRideComplete(customerRide: CustomerRide){
 
    this.customerRideService.completeCustomerRide(customerRide).subscribe(() => {
        alert("Your Ride has been completed");
        alert("Thanks for riding with us!!!");
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
      }
      
    });
  }

  onSignOut(){
      localStorage.removeItem("CustomerId");
      localStorage.removeItem("CustomerName");
    this.router.navigate(['login']);
  }

}


