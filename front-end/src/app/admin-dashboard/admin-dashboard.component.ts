import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  taxi=false;
  user=false;
  customer=false;
  driver=false;

  onTaxis(){
    this.taxi=!this.taxi;
    if(this.taxi)
    {
      this.user=false;
      this.customer=false;
      this.driver=false;
    }
  }
  onUsers(){
    this.user=!this.user;
    if(this.user)
      {
        this.customer=false;
        this.driver=false;
        this.taxi=false;
      }
  }
  onCustomers(){
    this.customer=!this.customer;
    if(this.customer)
    {
      this.user=false;
      this.driver=false;
      this.taxi=false;
    }
  }
  onDrivers(){
    this.driver=!this.driver;
    if(this.driver)
    {
      this.user=false;
      this.customer=false;
      this.taxi=false;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
