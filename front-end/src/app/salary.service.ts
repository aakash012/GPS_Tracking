import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Salary} from './salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  url='http://localhost:5050/api/Salary';
  constructor(private http:HttpClient) { }

  getAllDriverSalary(SalaryMonth:String,FinancialYear:String) 
  {
    return this.http.get(this.url + '/GetAllDriversSalary/'+SalaryMonth+'/'+FinancialYear);
  }

  calculateSalary(salary:Salary) : Observable<Salary>
  {
    return this.http.put<Salary>(this.url+'/CalculateSalary',salary);
  }
}
