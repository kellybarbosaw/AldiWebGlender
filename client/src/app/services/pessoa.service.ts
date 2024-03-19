import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pessoa, CreatePessoa, Pessoas } from '../models/pessoa.model';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private url = `${environment.api}/pessoa`;

  private pessoasSubject = new BehaviorSubject<Pessoas[]>([]);
  public allPessoas$ = this.pessoasSubject.asObservable();

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  registerPessoa(newPessoa: CreatePessoa) {
    return this.httpClient.post<CreatePessoa>(this.url, newPessoa);
  }

  getPessoasWithHeaders(offset: number, limit: number): Observable<{ pessoas: Pessoas[], headers: HttpHeaders }> {
    return this.httpClient.get<Pessoas[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
    .pipe(
      map(response => {
        const pessoas = response.body || []; // Extrai o corpo da resposta corretamente
        this.pessoasSubject.next(pessoas);
        const headers = response.headers;
        return { pessoas, headers };
      })
    )
  }

  pessoaCurrent(id: String) {
    return this.httpClient.get<Pessoa[]>(`${this.url}/${id}`);
  }

  editPessoa(pessoa: Pessoa) {
    return this.httpClient.put<Pessoa>(this.url, pessoa);
  }

  deletePessoa(id: number) {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  usuariosPessoa() {
    return this.httpClient.get<any>(`${this.url}/zusuarios`);
  }
}