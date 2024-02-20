import { Injectable } from '@angular/core';
import { Apontamento, CreateApontamento } from '../models/apontamento.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Time } from '@angular/common';
import { Http2ServerRequest } from 'http2';
import { ProjetoTarefaService } from "./projetoTarefa.service";
import test from 'node:test';

@Injectable({
  providedIn: 'root'
})

export class ApontamentoService {

  private url = `${environment.api}/apontamento`;

  constructor(private httpClient: HttpClient, private projetotarefaservice: ProjetoTarefaService) { }

  registerApontamento(newApontamento: CreateApontamento) {
    console.log(newApontamento);
    return this.httpClient.post<CreateApontamento>(this.url, newApontamento)
  }

  allApontamento(){
    return this.httpClient.get<Apontamento[]>(this.url)
  }

  apontamentoCurrent(id:String){
    return this.httpClient.get<Apontamento[]>(`${this.url}/${id}`)    
  }

  editApontamento(apontamento:Apontamento){
    console.log(apontamento)
    return this.httpClient.put<Apontamento>(this.url, apontamento)
  }

  deleteApontamento(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  calcularHoras(h1: string, h2: string){

    var horainicio = new Date (`2020-11-12 ${h1}`)
    var horafinal = new Date (`2020-11-12 ${h2}`)

    var hora1 = ("0" + horainicio.getHours()).slice(-2); // adiciona um zero à esquerda se necessário
    var minuto1 = ("0" + horainicio.getMinutes()).slice(-2);
    var hora2 = ("0" + horafinal.getHours()).slice(-2); // adiciona um zero à esquerda se necessário
    var minuto2 = ("0" + horafinal.getMinutes()).slice(-2);

    var results = (parseInt(hora2) * 60 + parseInt(minuto2)) - (parseInt(hora1) * 60 + parseInt(minuto1))


    
    console.log(results.toString())
  }

  passartempoparaaprojetotarefa(hora: string, id:string){
    //pega tarefa com id passado
    var horaexistente

    this.projetotarefaservice.projetoTarefaCurrent(id).subscribe(data =>{
      horaexistente = data[0].horasgastas;
    })

    //pegar objeto da tarefa e modificar a coluna de horas gastas adicionando as horas que recebemos na funçao

    //update na tarefa com a hora modificada
  }
}
