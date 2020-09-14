import { Component, OnInit, ViewChild } from '@angular/core';
import {AgmMap, MapsAPILoader  } from '@agm/core';

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
  constructor(private apiloader: MapsAPILoader) {}
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
}
