import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {

  userType:any;
  driverId:any;
  driverName:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.driverId=localStorage.getItem("DriverId");
    this.driverName=localStorage.getItem("DriverName");
    if(this.driverId == null)
    {
      this.router.navigate(['login']);
    }
    
  }

  
  onSignOut(){
    localStorage.removeItem("DriverId");
    localStorage.removeItem("DriverName");
    this.router.navigate(['login']);
  }

}
