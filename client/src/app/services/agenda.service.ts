import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CreateAgenda, Agenda, AgendaUser } from '../models/agenda.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  
  private url = `https://aldiwebglender.onrender.com/agenda`;

  constructor(private httpClient: HttpClient) { }

  getAgendasByDate(data: string): Observable<any[]> {
    const url = `${this.url}?data=${data}`;
    return this.httpClient.get<any[]>(url);
  }

  registerAgenda(agenda: any): Observable<any> {
    return this.httpClient.post<any>(this.url, agenda);
  }

  allAgenda(): Observable<Agenda[]> {
    return this.httpClient.get<Agenda[]>(this.url);
  }

  agendaCurrent(id:String){
    return this.httpClient.get<Agenda[]>(`${this.url}/${id}`)    
  }

  editAgenda(agenda:Agenda){
    console.log(agenda)
    return this.httpClient.put<Agenda>(this.url, agenda)
  }

  deleteAgenda(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  getAgendasByUsuarioCriacao(usuariocriacao: string): Observable<Agenda[]> {
    const url = `${this.url}/agendasByUsuarioCriacao?usuariocriacao=${usuariocriacao}`;
  
    // Recuperando o token do localStorage
    const token = localStorage.getItem('authorization-token-access');
    if (!token) {
      throw new Error('Token não encontrado. O usuário precisa estar autenticado.');
    }
    console.log('Token recuperado:', token);
    // Configurando os cabeçalhos com o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    console.log('URL da requisição:', url);
    console.log('Cabeçalhos enviados:', headers);
  
    // Fazendo a requisição HTTP com os cabeçalhos
    return this.httpClient.get<Agenda[]>(this.url, { headers });
  }
  
  
  
  
}
