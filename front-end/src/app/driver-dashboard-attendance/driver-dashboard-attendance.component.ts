import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Attendance } from '../attendance';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-driver-dashboard-attendance',
  templateUrl: './driver-dashboard-attendance.component.html',
  styleUrls: ['./driver-dashboard-attendance.component.css']
})
export class DriverDashboardAttendanceComponent implements OnInit {

  attendanceList: Attendance[];
  driverId:any;
  
  constructor(private formbulider: FormBuilder,private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    
    this.driverId = localStorage.getItem("DriverId");
    this.getAttendanceByDriverId(this.driverId);
  }
  getAttendanceByDriverId(DriverId:number) {
    this.attendanceService.getAttendanceByDriverId(DriverId).subscribe((data: Attendance[]) => {
      this.attendanceList = data;
    });
  }

}
