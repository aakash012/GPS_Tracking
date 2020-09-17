import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  url='http://localhost:5050/api/User';
  constructor(private http:HttpClient) { }

  checkUserName(login:Login) : Observable<Login>
  {
    return this.http.post<Login>(this.url+'/CheckUserName',login);
  }

  updatePassword(login:Login): Observable<Login>
  {
    return this.http.put<Login>(this.url+'/UpdatePassword',login);
  }

}
