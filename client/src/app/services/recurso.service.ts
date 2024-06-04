import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recurso, CreateRecurso, Recursos } from '../models/recurso.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private url = `${environment.api}/recurso`;

  private recursosSubject = new BehaviorSubject<Recursos[]>([]);
  public allRecursos$ = this.recursosSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  registerRecurso(newRecurso: CreateRecurso) {
    console.log(newRecurso);
    return this.httpClient.post<CreateRecurso>(this.url, newRecurso)
  }

  getRecursosWithHeaders(offset: number, limit: number): Observable<{ recursos: Recursos[], headers: HttpHeaders }> {
    return this.httpClient.get<Recursos[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
    .pipe(
      map(response => {
        const recursos = response.body || []; // Extrai o corpo da resposta corretamente
        this.recursosSubject.next(recursos);
        const headers = response.headers;
        return { recursos, headers };
      })
    )
  }

  allRecurso(){
    return this.httpClient.get<Recursos[]>(this.url)
  }

  recursoCurrent(id:String){
    return this.httpClient.get<Recurso[]>(`${this.url}/${id}`)    
  }

  editRecurso(recurso:Recurso){
    console.log(recurso)
    return this.httpClient.put<Recurso>(this.url, recurso)
  }

  deleteRecurso(id:number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  buscarTipoRecurso() {
    return this.httpClient.get<any>(`${this.url}/tipoRecurso`);
  }
  
  pessoaRecurso(){
    return this.httpClient.get<any>(`${this.url}/zpessoas`);
  }

}
