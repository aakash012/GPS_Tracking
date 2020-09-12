import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url= ''
  constructor(private http: HttpClient) { }
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/AllUserDetails');
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + '/GetUserDetailsById/' + userId);
  }
  createUser(User: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(this.url + '/InsertUserDetails/', User, httpOptions);
  }

  updateUser(User: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<User>(this.url + '/UpdateUserDetails/', User, httpOptions);
  }

  deleteUserById(userId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteUserDetails?id=' + userId, httpOptions);
  }
}
