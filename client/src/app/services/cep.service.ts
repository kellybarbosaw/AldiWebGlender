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

  burcaCep(type: string, key:string):any{

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

  buscarPais() {
    return this.httpClient.get<any>(`${this.urlpais}`)
  }
  buscareEstado(idPais: string) {
    return this.httpClient.get<any>(`${this.urlestado}/${idPais}`)
  }
  buscarCidade(uf: string) {
    return this.httpClient.get<any>(`${this.urlcidade}/${uf}`)
  }
  buscarOrgaoEmissor() {
    return this.httpClient.get<any>(`${this.urlcep}/orgaoemissor`)
  }
}
