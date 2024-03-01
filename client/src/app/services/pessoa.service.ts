import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pessoa, CreatePessoa, Pessoas } from '../models/pessoa.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private url = `${environment.api}/pessoa`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) {}

  registerPessoa(newPessoa: CreatePessoa) {
    console.log(newPessoa)
    return this.httpClient.post<CreatePessoa>(this.url, newPessoa);
  }

  allPessoa() {
    return this.httpClient.get<Pessoas[]>(this.url);
  }

  pessoaCurrent(id: String) {
    return this.httpClient.get<Pessoa[]>(`${this.url}/${id}`);
  }

  editPessoa(pessoa: Pessoa) {
    console.log(pessoa);
    return this.httpClient.put<Pessoa>(this.url, pessoa);
  }

  deletePessoa(id: number) {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}