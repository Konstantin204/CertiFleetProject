import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Certificate} from "../models/Certficate";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  saveNewCertificate(certificate: Certificate[], type: string) {
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', certificate[0].imoNo);
    return this.http.post(`${this.apiUrl}/${type}-certificate/save`, certificate, {params});
  }

  getCertificateByImoNo(imoNo: number, type: string): Observable<Certificate[]>{
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', imoNo);
    return this.http.get<Certificate[]>(`${this.apiUrl}/${type}-certificate/get-by-imoNo/${imoNo}`, {params});
  }

  getCertificateByImoNoAndNumber(imoNo: number, certNumber: number, type: string){
    let params: HttpParams = new HttpParams()
    .set('imoNo', imoNo)
    .set('certNumber', certNumber)
    return this.http.get<Certificate>(`${this.apiUrl}/${type}-certificate/get-by-imoNo-and-number`, {params});
  }

  updateCertificate(certificate: Certificate, type: string){
    let params: HttpParams = new HttpParams();
    params = params.set('imoNo', certificate.imoNo);
    return this.http.put(`${this.apiUrl}/${type}-certificate/update`, certificate, {params});
  }

}
