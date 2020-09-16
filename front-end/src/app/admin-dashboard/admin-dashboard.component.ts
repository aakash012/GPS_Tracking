import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  userType:any;
  userId:any;
  userName:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userType=localStorage.getItem("UserType");
    this.userId=localStorage.getItem("UserId");
    this.userName=localStorage.getItem("UserName");
    
    if(this.userId == null)
    {
      this.router.navigate(['login']);
    }
  }

  taxi=false;
  user=false;
  customer=false;
  driver=false;
  driverLoc=true;
  custRide=false;
  attend=false;
  onTaxis(){
    this.taxi=true;
    if(this.taxi)
    {
      this.user=false;
      this.customer=false;
      this.driver=false;
      this.driverLoc=false;
      this.custRide=false;
      this.attend=false;
    }
  }
  onUsers(){
    this.user=true
    if(this.user)
      {
        this.customer=false;
        this.driver=false;
        this.taxi=false;
        this.driverLoc=false;
        this.custRide=false;
        this.attend=false;
      }
  }
  onCustomers(){
    this.customer=true;
    if(this.customer)
    {
      this.user=false;
      this.driver=false;
      this.taxi=false;
      this.driverLoc=false;
      this.custRide=false;
      this.attend=false;
    }
  }
  onDrivers(){
    this.driver=true;
    if(this.driver)
    {
      this.user=false;
      this.customer=false;
      this.taxi=false;
      this.driverLoc=false;
      this.custRide=false;
      this.attend=false;
    }
  }
  driverLocation(){
    this.driverLoc=true;
    if(this.driverLoc)
    {
      this.user=false;
      this.customer=false;
      this.taxi=false;
      this.driver=false;
      this.custRide=false;
      this.attend=false;
    }
  }
  customerRide(){
    this.custRide=true;
    if(this.custRide=true)
    {
      this.user=false;
      this.customer=false;
      this.taxi=false;
      this.driver=false;
      this.driverLoc=false;
      this.attend=false;
    }
  }
  onAttendance(){
    this.attend=true;
    if(this.attend=true)
    {
      this.user=false;
      this.customer=false;
      this.taxi=false;
      this.driver=false;
      this.driverLoc=false;
      this.custRide=false;
    }
  }
  onSignOut(){
    localStorage.removeItem("UserId");
    localStorage.removeItem("userName");
    this.router.navigate(['login']);
  }



}
