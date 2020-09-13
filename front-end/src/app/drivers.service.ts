import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from './drivers';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  url= ''
  constructor(private http: HttpClient) { }
  getAllDriver(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.url + '/AllDriverDetails');
  }

  getDriverById(driverId: string): Observable<Driver> {
    return this.http.get<Driver>(this.url + '/GetDriverDetailsById/' + driverId);
  }
  createDriver(Driver: Driver): Observable<Driver> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Driver>(this.url + '/InsertDriverDetails/', Driver, httpOptions);
  }

  updateDriver(Driver: Driver): Observable<Driver> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Driver>(this.url + '/UpdateDriverDetails/', Driver, httpOptions);
  }

  deleteDriverById(driverId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteDriverDetails?id=' + driverId, httpOptions);
  }
}
