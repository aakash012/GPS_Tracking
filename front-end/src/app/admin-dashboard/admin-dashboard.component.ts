import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  user=false;
  customer=false;
  driver=false;
  onUsers(){
    this.user=!this.user;
    if(this.user)
      {
        this.customer=false;
        this.driver=false;
      }
  }
  onCustomers(){
    this.customer=!this.customer;
    if(this.customer)
    {
      this.user=false;
      this.driver=false;
    }
  }
  onDrivers(){
    this.driver=!this.driver;
    if(this.driver)
    {
      this.user=false;
      this.customer=false;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
