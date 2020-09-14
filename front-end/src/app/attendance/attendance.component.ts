import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Attendance } from '../attendance';
import { AttendanceService } from '../attendance.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  attendanceList: Attendance[];
  constructor(private formbulider: FormBuilder,private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.getAttendanceDetails();
  }
  getAttendanceDetails() {
    this.attendanceService.getAllAttendance().subscribe((data: Attendance[]) => {
      this.attendanceList = data;
    });
  }
}
