import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recurso, CreateRecurso } from '../models/recurso.model';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  private url = `${environment.api}/recurso`;

  constructor(private httpClient: HttpClient) { }

  registerRecurso(newRecurso: CreateRecurso) {
    console.log(newRecurso);
    return this.httpClient.post<CreateRecurso>(this.url, newRecurso)
  }

  allRecurso(){
    return this.httpClient.get<Recurso[]>(this.url)
  }

  recursoCurrent(id:String){
    return this.httpClient.get<Recurso[]>(`${this.url}/${id}`)    
  }

  editRecurso(recurso:Recurso){
    console.log(recurso)
    return this.httpClient.put<Recurso>(this.url, recurso)
  }

  deleteRecurso(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

}
