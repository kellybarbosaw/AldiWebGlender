import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pessoa, CreatePessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private url = `${environment.api}/pessoa`;

  constructor(private httpClient: HttpClient) {}

  registerPessoa(newPessoa: CreatePessoa) {
    console.log(newPessoa)
    return this.httpClient.post<CreatePessoa>(this.url, newPessoa);
  }

  allPessoa() {
    return this.httpClient.get<Pessoa[]>(this.url);
  }

  pessoaCurrent(id: String) {
    return this.httpClient.get<Pessoa[]>(`${this.url}/${id}`);
  }

  editPessoa(pessoa: Pessoa) {
    console.log(pessoa);
    return this.httpClient.put<Pessoa>(this.url, pessoa);
  }

  deletePessoa(id: string) {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}