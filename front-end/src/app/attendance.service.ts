import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from './attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  url='http://localhost:5050/api/CustomerRide';
  
  constructor(private http:HttpClient) { }
  getAllAttendance()
  {
    return this.http.get(this.url + '/GetAllAttendance');
  }

  getAttendanceByDriverId(DriverId:number)
  {
    return this.http.get(this.url + '/GetAllAttendanceByDriverId/'+DriverId);
  }
}
