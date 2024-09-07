import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Inspection} from "../models/Inspection";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private apiUrl = 'http://localhost:8080/inspection'
  constructor(private http: HttpClient) { }

  saveNewInspection(inspection: Inspection){
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', inspection.imoNo);
    return this.http.post(`${this.apiUrl}/save`, inspection, {params});
  }

  getInspectionByImoNo(imoNo: number): Observable<Inspection[]>{
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', imoNo);
    return this.http.get<Inspection[]>(`${this.apiUrl}/get-by-imoNo/${imoNo}`, {params});
  }

  updateInspection(inspection: Inspection): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', inspection.imoNo);
    return this.http.put<any>(`${this.apiUrl}/update`, inspection, {params});
  }
  getInspectionByImoAndDate(imoNo: number, startingDate: string): Observable<Inspection> {
    const url = this.apiUrl + '/get-by-imoNo-and-startingDate'
    const params = new HttpParams()
      .set('imoNo', imoNo)
      .set('startingDate', startingDate);

    return this.http.get<Inspection>(url, { params });
  }

}
