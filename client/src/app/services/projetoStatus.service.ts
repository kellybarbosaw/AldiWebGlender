import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateProjetoStatus, ProjetoStatus } from '../models/projetoStatus.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoStatusService {

  private url = `${environment.api}/projetoStatus`;

  constructor(private httpClient: HttpClient) {}

  registerProjetoStatus(newProjetoStatus: CreateProjetoStatus) {
    console.log(newProjetoStatus)
    return this.httpClient.post<CreateProjetoStatus>(this.url, newProjetoStatus)
  }

  allProjetoStatus(){
    return this.httpClient.get<ProjetoStatus[]>(this.url)
  }

  projetoStatusCurrent(id: String){
    return this.httpClient.get<ProjetoStatus[]>(`${this.url}/${id}`)    
  }

  editProjetoStatus(projetoStatus:ProjetoStatus){
    console.log(projetoStatus)
    return this.httpClient.put<ProjetoStatus>(this.url, projetoStatus)
  }

  deleteProjetoStatus(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }
}
