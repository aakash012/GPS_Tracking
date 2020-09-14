import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  taxi=false;
  user=false;
  customer=false;
  driver=false;
  driverLoc=false;
  custRide=false;
  onTaxis(){
    this.taxi=true;
    if(this.taxi)
    {
      this.user=false;
      this.customer=false;
      this.driver=false;
      this.driverLoc=false;
      this.custRide=false;
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
    }
  }
  onSignOut(){
    this.router.navigate(['login']);
  }

 

}
