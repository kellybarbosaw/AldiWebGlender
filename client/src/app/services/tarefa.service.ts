import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tarefa, CreateTarefa, Tarefas } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private url = `${environment.api}/tarefa`;

  constructor(private httpClient: HttpClient) { }

  registerTarefa(newTarefa: CreateTarefa) {
    return this.httpClient.post<CreateTarefa>(this.url, newTarefa)
  }

  allTarefa(){
    return this.httpClient.get<Tarefas[]>(this.url)
  }

  tarefaCurrent(id:String){
    return this.httpClient.get<Tarefa[]>(`${this.url}/${id}`)    
  }

  editTarefa(tarefa:Tarefa){
    return this.httpClient.put<Tarefa>(this.url, tarefa)
  }

  deleteTarefa(id:number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

}
