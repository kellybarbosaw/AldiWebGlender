import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TarefaStatus, CreateTarefaStatus } from '../models/tarefaStatus.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaStatusService {

  private url = `${environment.api}/tarefaStatus`;

  constructor(private httpClient: HttpClient) { }

  registerTarefaStatus(newTarefaStatus: CreateTarefaStatus) {
    return this.httpClient.post<CreateTarefaStatus>(this.url, newTarefaStatus)
  }

  allTarefaStatus(){
    return this.httpClient.get<TarefaStatus[]>(this.url)
  }

  tarefaStatusCurrent(id:String){
    return this.httpClient.get<TarefaStatus[]>(`${this.url}/${id}`)    
  }

  editTarefaStatus(tarefaStatus:TarefaStatus){
    return this.httpClient.put<TarefaStatus>(this.url, tarefaStatus)
  }

  deleteTarefaStatus(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

}
