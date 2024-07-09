import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CepService {

  private urlCnpj = `${environment.apiCnpj}`;
  private urlCepapi = `${environment.apiCep}`;
  private urlcep = `${environment.api}/cep`;
  private urlpais = `${environment.api}/cep/pais`;
  private urlestado = `${environment.api}/cep/estado`;
  private urlcidade = `${environment.api}/cep/cidade`;

  constructor(private httpClient: HttpClient) { }

  burcaCep(type: string, key:string|null):any{

    switch (type) {
      case 'pais':
        return this.httpClient.get<any>(`${this.urlpais}`)
      case 'estado':
        return this.httpClient.get<any>(`${this.urlestado}/${key}`)
      case 'cidade':
        return this.httpClient.get<any>(`${this.urlcidade}/${key}`)
      default:
        break
    }
  }

  buscarOrgaoEmissor() {
    return this.httpClient.get<any>(`${this.urlcep}/orgaoemissor`)
  };

  buscarCnpj(cnpj: any) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer 5127a36571723e23134014797dadb582050824d303a79ffba8689ef0ded84984',
    });
    const httpOptions = {
      method: 'GET',
      headers: headers,
      withCredentials: true
    };
  
    return this.httpClient.get<any>(`${this.urlCnpj}/${cnpj}`, httpOptions)
  };

  buscarCep(cep:any){

    
    const headers = new HttpHeaders({
      Accept: 'application/json',
      
    });
    const httpOptions = {
      method: 'GET',
      headers: headers,
      withCredentials: true
    };

    return this.httpClient.get<any>(`${this.urlCepapi}/${cep}/json/`, httpOptions)
  };
}
