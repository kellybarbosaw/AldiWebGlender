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

  // buscarCnpj(cnpj: any) {
  //   const headers = new HttpHeaders({
  //     Accept: 'application/json',
  //     Authorization: 'Bearer e4da68e48a89b5879b8847ee974987e0eb8db45a1afbee577cebe5cd65d3e52a'
  //   });
  //   const httpOptions = {
  //     headers: headers,
  //     withCredentials: true,
  //   };
  //   return this.httpClient.get<any>(`${this.urlCnpj}/${cnpj}/days/1`, httpOptions);
  // };
  
  buscarCnpj(cnpj: any) {
    let headers1 = new HttpHeaders()
    .append('Authorization', 'Bearer e4da68e48a89b5879b8847ee974987e0eb8db45a1afbee577cebe5cd65d3e52a')
    .append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
    .append('access-control-allow-origin', '*')
    .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    .append('filterType', 'name')

    return this.httpClient.get<any>(`${this.urlCnpj}/${cnpj}/days/1`,  { headers: headers1 });
  };

  buscarCep(cep:any){
    return this.httpClient.get<any>(`${this.urlCepapi}/${cep}/json/`)
  };
}
