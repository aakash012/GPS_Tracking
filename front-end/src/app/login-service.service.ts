import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { Login } from './login';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  Url: string;
  token: string;
  header: any;

  url='http://localhost:5050/api/User';
  constructor(private http: HttpClient) {

  }
  Login(login : Login) {
    return this.http.post<Login>(this.url+'/Login',login);
  }

}
