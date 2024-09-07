import { Injectable } from '@angular/core';
import {Ship} from "../models/Ship";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  private apiUrl = 'http://localhost:8080/ship'

  constructor(private http: HttpClient) { }


  saveShipData(ship: Ship[]){
    return this.http.post(`${this.apiUrl}/ship/save`, ship);
  }

  getImoNos() {
    return this.http.get(`${this.apiUrl}/get-imo-nos`);
  }

  getShips() {
    return this.http.get(`${this.apiUrl}/get-ships`)
  }

  getShipByImoNo(imoNo: number): Observable<Ship>{
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', imoNo);
    return this.http.get<Ship>(`${this.apiUrl}/get-by-imoNo/${imoNo}`, {params})
  }

}
