import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locations } from './locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  url='http://localhost:5050/api/Locations';
  constructor(private http:HttpClient) { }

  getAllLocations()
  {
    return this.http.get(this.url + '/GetAllLocations');
  }

  getRideLocationsForDirection(CustomerId:Number)
  {
    return this.http.get(this.url + '/GetRideLocationsForDirection/' + CustomerId);
  }

  getLocationById(LocationId:number) : Observable<Locations>
  {
    return this.http.get<Locations>(this.url + '/GetLocationById/'+LocationId);
  }


}
