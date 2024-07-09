import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateTipoRecurso, TipoRecurso, TipoRecursos } from '../models/tipoRecurso.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoRecursoService {

  private url = `${environment.api}/tipoRecurso`;

private tipoRecursosSubject = new BehaviorSubject<TipoRecursos[]>([]);
public allTipoRecursos$ = this.tipoRecursosSubject.asObservable();

constructor(private httpClient: HttpClient) { }

registerTipoRecurso(newTipoRecurso: CreateTipoRecurso) {
  return this.httpClient.post<CreateTipoRecurso>(this.url, newTipoRecurso)
  
}

getTipoRecursosWithHeaders(offset: number, limit: number): Observable<{ tipoRecursos: TipoRecursos[], headers: HttpHeaders }> {
  return this.httpClient.get<TipoRecursos[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
  .pipe(
    map(response => {
      const tipoRecursos = response.body || []; // Extrai o corpo da resposta corretamente
      this.tipoRecursosSubject.next(tipoRecursos);
      const headers = response.headers;
      return { tipoRecursos, headers };
    })
  )
}

tipoRecursoCurrent(id:String){
  return this.httpClient.get<TipoRecurso[]>(`${this.url}/${id}`)    
}

editTipoRecurso(tipoRecurso:TipoRecurso){
  return this.httpClient.put<TipoRecurso>(this.url, tipoRecurso)
}

deleteTipoRecurso(id:number){
  return this.httpClient.delete<void>(`${this.url}/${id}`)
}
}
