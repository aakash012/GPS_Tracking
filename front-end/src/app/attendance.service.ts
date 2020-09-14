import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from './attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  url='';
  http: any;
  constructor() { }
  getAllAttendance()
  {
    return this.http.get(this.url + '/GetAllAttendance');
  }
}
