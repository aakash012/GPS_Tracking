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

  constructor(private router: Router,private formbulider: FormBuilder,private apiloader: MapsAPILoader,private customerRideService: CustomerRideService ) {}
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
                    }, function(results) {
                        console.log(latlng);
                        console.log(results);
                        if (results[0]) {
                            this.currentLocation = results[0].formatted_address;
                            alert(this.currentLocation);
                            console.log(this.assgin);
                        } else {
                            console.log('Not found');
                        }

                        // this.customerRideForm = this.formbulider.group({
                        //     CustomerId: ['1'],
                        //     PickUpLocation: [this.lat, [Validators.required]],
                        //     DropLocation: ['Jalandhar', [Validators.required]]
                      
                        //   });
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

     this.customerRideForm = this.formbulider.group({
        CustomerId: ['20'],
        PickUpLocation: ['Jalandhar', [Validators.required]],
        DropLocation: ['Ludhiana', [Validators.required]]
  
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
    //alert(taxi);
    this.CreateCustomerRide(customerRide);
    
  }
  
  CreateCustomerRide(customerRide: CustomerRide) {
    
      this.customerRideService.saveCustomerRide(customerRide).subscribe(() => {
       
      });
    
   
  }

  onSignOut(){
    this.router.navigate(['login']);
  }

}


