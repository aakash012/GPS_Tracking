import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  latitude = 28.56;
  longitude = 77.43;
  locationChosen = true;
}
