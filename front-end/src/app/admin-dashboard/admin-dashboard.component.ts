import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  display=false;
  customer=false;
  onUsers(){
    this.display=!this.display;
    if(this.display)
      this.customer=false;
  }
  onCustomers(){
    this.customer=!this.customer;
    if(this.customer)
      this.display=false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
