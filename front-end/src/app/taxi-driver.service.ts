import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaxiDriver } from './taxi-driver';

@Injectable({
  providedIn: 'root'
})
export class TaxiDriverService {

  
  url='http://localhost:5050/api/TaxiDriver';
  constructor(private http:HttpClient) { }

  
  getAllTaxiDriver() 
  {
    return this.http.get(this.url + '/GetAllTaxiDriver');
  }
}
