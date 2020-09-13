import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url= ''
  constructor(private http: HttpClient) {  }
  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url + '/AllCustomerDetails');
  }
}
