import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from './register';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  url='http://localhost:5050/api/Customer';
  constructor(private http: HttpClient) {

  }
  
  CreateCustomer(register: Register) {
    
    return this.http.post<Register[]>(this.url + '/save',register);
  }
}
