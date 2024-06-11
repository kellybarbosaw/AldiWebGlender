import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {ProjetoTarefa, CreateProjetoTarefa, ProjetoTarefadbDB } from '../models/projetoTarefa.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoTarefaService {

  private url = `${environment.api}/projetoTarefa`;

  constructor(private httpClient: HttpClient) {}

  registerProjetoTarefa(newProjetoTarefa: CreateProjetoTarefa) {
    return this.httpClient.post<CreateProjetoTarefa>(this.url, newProjetoTarefa)
  }

  allProjetoTarefa(){
    return this.httpClient.get<ProjetoTarefa[]>(this.url)
  }

  projetoTarefaCurrent(id: String){
    return this.httpClient.get<ProjetoTarefa[]>(`${this.url}/${id}`)    
  }

  editProjetoTarefa(projetoTarefa:ProjetoTarefa){
    console.log(projetoTarefa)
    return this.httpClient.put<ProjetoTarefa>(this.url, projetoTarefa)
  }

  deleteProjetoTarefa(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  tarefaProjetoTarefa() {
    return this.httpClient.get<any>(`${this.url}/tarefa`);
  }

  selecProjetoTarefaDoProjeto(id: String){
    return this.httpClient.get<ProjetoTarefadbDB[]>(`${this.url}/projeto/${id}`)
  }
  
  selectProjeto(dados:any){
    console.log(dados);
    return this.httpClient.get<any>(`${this.url}/projeto`);
  }
}