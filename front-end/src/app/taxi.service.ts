import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Taxi } from './taxi';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  url='http://localhost:5050/api/Taxi';
  constructor(private http:HttpClient) { }

  getAllTaxi() 
  {
    return this.http.get(this.url + '/GetAllTaxi');
  }

  getAllTaxiForDropDown() 
  {
    return this.http.get(this.url + '/GetAllTaxiForDropDown');
  }

  getTaxiById(TaxiId:number) : Observable<Taxi>
  {
    return this.http.get<Taxi>(this.url + '/GetTaxiById/'+TaxiId);
  }

  saveTaxi(taxi:Taxi) : Observable<Taxi>
  {
    return this.http.post<Taxi>(this.url+'/Save',taxi);
  }

  updateTaxi(taxi:Taxi): Observable<Taxi>
  {
    return this.http.put<Taxi>(this.url+'/Update',taxi);
  }

  deleteTaxiById(TaxiId:number):Observable<number>{
    return this.http.delete<number>(this.url+'/DeleteById/'+TaxiId);
  }

  

}
