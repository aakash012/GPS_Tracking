import { Component, OnInit, ViewChild } from '@angular/core';
import {AgmMap, MapsAPILoader  } from '@agm/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerRide } from '../customer-ride';
import { CustomerRideService } from '../customer-ride.service';
import { Router } from '@angular/router';
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
  getAddress: any;
  zoom: number;
  latitude: any;
  longitude: any;
  customerRideForm:any;
  customerId:any;
  customerName:any;
  rideClick : boolean = true;
  rideList: CustomerRide[];

  constructor(private router: Router,private formbulider: FormBuilder,private apiloader: MapsAPILoader,private customerRideService: CustomerRideService ) {}
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

     this.customerRideForm = this.formbulider.group({
        CustomerId: [this.customerId],
        PickUpLocation: ['Amritsar', [Validators.required]],
        DropLocation: ['Jalandhar', [Validators.required]]
  
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

  onBookRide() {
    const customerRide = this.customerRideForm.value;
    this.CreateCustomerRide(customerRide);
    
  }
  
  CreateCustomerRide(customerRide: CustomerRide) {
    
      this.customerRideService.saveCustomerRide(customerRide).subscribe(() => {
       alert("Your Booking Request has been sent!!!");
       this.rideClick=true;
       this.getRideDetails(this.customerId);
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


