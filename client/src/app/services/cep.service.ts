import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CepService {

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
  }
}
