import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url='http://localhost:5050/api/Customer';
  constructor(private http:HttpClient) { }

  getAllCustomer() 
  {
    return this.http.get(this.url + '/GetAllCustomer');
  }
}
