import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  onSignOut(){
    this.router.navigate(['login']);
  }

}
