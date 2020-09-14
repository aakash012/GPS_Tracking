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

  onTaxis(){
    
    this.taxi=true;
    if(this.taxi)
    {
      this.user=false;
      this.customer=false;
      this.driver=false;
    }
  }
  onUsers(){
    this.user=true
    if(this.user)
      {
        this.customer=false;
        this.driver=false;
        this.taxi=false;
      }
  }
  onCustomers(){
    this.customer=true;
    if(this.customer)
    {
      this.user=false;
      this.driver=false;
      this.taxi=false;
    }
  }
  onDrivers(){
    this.driver=true;
    if(this.driver)
    {
      this.user=false;
      this.customer=false;
      this.taxi=false;
    }
  }
  onSignOut(){
    this.router.navigate(['login']);
  }

 

}
