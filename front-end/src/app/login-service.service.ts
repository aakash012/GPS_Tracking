import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Register } from './register';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  Url: string;
  token: string;
  header: any;

  constructor(private http: HttpClient) {
    this.Url = '';
    const headerSettings: { [name: string]: string | string[] } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  Login(model: any) {
    debugger;
    var a = this.Url + 'UserLogin';
    return this.http.post<any>(this.Url + 'UserLogin', model, {
      headers: this.header,
    });
  }
  CreateCustomer(register: Register) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Register[]>(
      this.Url + '/save/',
      register,
      httpOptions
    );
  }
}
