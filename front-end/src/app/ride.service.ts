import { Injectable } from '@angular/core';
import { Rides } from './rides';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  url='';
  constructor(private http:HttpClient) { }

  getAllRides()
  {
    return this.http.get(this.url + '/GetAllRides');
  }

  getRideById(RideId:number) : Observable<Rides>
  {
    return this.http.get<Rides>(this.url + '/GetRideById/'+RideId);
  }

  saveRide(ride:Rides) : Observable<Rides>
  {
    return this.http.post<Rides>(this.url+'/Save',Rides);
  }

  updateRide(driver:Rides): Observable<Rides>
  {
    return this.http.put<Rides>(this.url+'/Update',Rides);
  }
}
