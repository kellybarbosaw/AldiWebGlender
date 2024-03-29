import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tarefa, CreateTarefa, Tarefas } from '../models/tarefa.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private url = `${environment.api}/tarefa`;

  private tarefasSubject = new BehaviorSubject<Tarefas[]>([]);
  public allTarefas$ = this.tarefasSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  registerTarefa(newTarefa: CreateTarefa) {
    return this.httpClient.post<CreateTarefa>(this.url, newTarefa)
  }

  // allTarefa(){
  //   return this.httpClient.get<Tarefas[]>(this.url)
  // }
  getTarefasWithHeaders(offset: number, limit: number): Observable<{ tarefas: Tarefas[], headers: HttpHeaders }> {
    return this.httpClient.get<Tarefas[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
    .pipe(
      map(response => {
        const tarefas = response.body || []; // Extrai o corpo da resposta corretamente
        this.tarefasSubject.next(tarefas);
        const headers = response.headers;
        return { tarefas, headers };
      })
    )
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
