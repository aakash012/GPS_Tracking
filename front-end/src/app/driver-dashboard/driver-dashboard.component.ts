import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})

export class DriverDashboardComponent implements OnInit {
  userType: any;
  driverId: any;
  driverName: any;
  myLocation=true;
  attendance=false;
  myRides=false;
  salary=false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.driverId = localStorage.getItem("DriverId");
    this.driverName = localStorage.getItem("DriverName");
    if (this.driverId == null) {
      this.router.navigate(['login']);
    }

  }

  onMyLocation(){
    this.myLocation=true;
    if(this.myLocation)
    {
      this.myRides=false;
      this.attendance=false;
      this.salary=false;
    }
  }
  onAttendance(){
    this.attendance=true;
    if(this.attendance)
    {
      this.myRides=false;
      this.myLocation=false;
      this.salary=false;
    }
  }
  onMyRides(){
    this.myRides=true;
    if(this.myRides)
    {
      this.myLocation=false;
      this.attendance=false;
      this.salary=false;
    }
  }
  onSalary(){
    this.salary=true;
    if(this.salary)
    {
      this.myRides=false;
      this.myLocation=false;
      this.attendance=false;
    }
  }

  onSignOut() {
    localStorage.removeItem("DriverId");
    localStorage.removeItem("DriverName");
    this.router.navigate(['login']);
  }

}
