import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from './drivers';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  url='http://localhost:5050/api/Driver';
  constructor(private http:HttpClient) { }

  getAllDriver() 
  {
    return this.http.get(this.url + '/GetAllDrivers');
  }

  getDriverById(DriverId:number) : Observable<Driver>
  {
    return this.http.get<Driver>(this.url + '/GetDriverById/'+DriverId);
  }

  saveDriver(driver:Driver) : Observable<Driver>
  {
    return this.http.post<Driver>(this.url+'/Save',driver);
  }

  updateDriver(driver:Driver): Observable<Driver>
  {
    return this.http.put<Driver>(this.url+'/Update',driver);
  }

  deleteDriverById(DriverId:number):Observable<number>{
    return this.http.delete<number>(this.url+'/DeleteById/'+DriverId);
  }
}
