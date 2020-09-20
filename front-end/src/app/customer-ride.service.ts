import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerRide } from './customer-ride';

@Injectable({
  providedIn: 'root'
})
export class CustomerRideService {
  
  url='http://localhost:5050/api/CustomerRide';
  constructor(private http:HttpClient) { }

  getAllCustomerRide() 
  {
    return this.http.get(this.url + '/GetAllCustomerRide');
  }

  getAllCustomerRideForUserDashBoard(CustomerId:number) 
  {
    return this.http.get(this.url + '/GetCustomerRideByCustomerId/' + CustomerId);
  }

  CheckRideCompletionByCustomerId(CustomerId:number) 
  {
    return this.http.get(this.url + '/CheckRideCompletionByCustomerId/' + CustomerId);
  }


  getCustomerRideById(CustomerRideId:number) : Observable<CustomerRide>
  {
    return this.http.get<CustomerRide>(this.url + '/GetCustomerRideById/'+CustomerRideId);
  }

  saveCustomerRide(customerRide:CustomerRide) : Observable<CustomerRide>
  {
    return this.http.post<CustomerRide>(this.url+'/Save',customerRide);
  }
  approveCustomerRide(customerRide:CustomerRide) : Observable<CustomerRide>
  {
    return this.http.put<CustomerRide>(this.url+'/Update',customerRide);
  }
  completeCustomerRide(customerRide:CustomerRide) 
  {
    return this.http.put(this.url+'/CompleteRide',customerRide );
  }
}
