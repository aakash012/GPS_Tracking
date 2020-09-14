import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='http://localhost:5050/api/User';
  constructor(private http:HttpClient) { }

  getAllUser() 
  {
    return this.http.get(this.url + '/GetAllUser');
  }

  getUserById(UserId:number) : Observable<User>
  {
    return this.http.get<User>(this.url + '/GetUserById/'+UserId);
  }

  saveUser(user:User) : Observable<User>
  {
    return this.http.post<User>(this.url+'/Save',user);
  }

  updateUser(user:User): Observable<User>
  {
    return this.http.put<User>(this.url+'/Update',user);
  }

  deleteUserById(UserId:number):Observable<number>{
    return this.http.delete<number>(this.url+'/DeleteById/'+UserId);
  }
}
