import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taxi } from './taxi';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  url= ''
  constructor(private http: HttpClient) { }
  getAllTaxi(): Observable<Taxi[]> {
    return this.http.get<Taxi[]>(this.url + '/AllTaxiDetails');
  }

  getTaxiById(taxiId: string): Observable<Taxi> {
    return this.http.get<Taxi>(this.url + '/GetTaxiDetailsById/' + taxiId);
  }
  createTaxi(Taxi: Taxi): Observable<Taxi> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Taxi>(this.url + '/InsertTaxiDetails/', Taxi, httpOptions);
  }

  updateTaxi(Taxi: Taxi): Observable<Taxi> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Taxi>(this.url + '/UpdateTaxiDetails/', Taxi, httpOptions);
  }

  deleteTaxiById(taxiId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/DeleteTaxiDetails?id=' + taxiId, httpOptions);
  }
}
