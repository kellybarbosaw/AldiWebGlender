import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client, CreateClient } from '../models/client.model';
import { LoginService } from './login.service';

import { PessoaService } from "./pessoa.service";
import { UsuariosService } from "./usuarios.service";
import { FormatsService } from './formats.service';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = `${environment.api}/client`;

  private usuario = {
    usuario: '',
    nome: '',
    ativo: 2,
    perfil: 'cliente',
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    senha: '',
    email: 'cliente123',
  }
  private pessoa = {
    nome: '',
    cpf: '',
    dtnascimento: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    naturalidade: '',
    nacionalidade: '',
    usuario: '',
    nroidentidade: '',
    orgaoemissorident: '',
    estadoemissorident: '',
    zusuario_usuario: '',
    dtcriacao: '',
    dtalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: ''
  };

  constructor(
    private httpClient: HttpClient,
    private formatService: FormatsService,
    private usuarioService: UsuariosService,
    private pessoaService: PessoaService,
  ) { }

  registerClient(newClient: CreateClient) {
    console.log(newClient)
    return this.httpClient.post<CreateClient>(this.url, newClient)
  }

  allClients(offset:number,limit:number) {
    var teste = this.httpClient.get<Client[]>(`${this.url}/?offset=${offset}&limit=${limit}`)
    console.log(teste)
    return teste
  }

  clientCurrent(id: String) {
    return this.httpClient.get<Client[]>(`${this.url}/${id}`)
  }

  editClient(client: CreateClient) {
    return this.httpClient.put<Client>(this.url, client)
  }

  deleteClient(id: number) {
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  registerPessoaFisica(newClient: CreateClient, dtnascimento: string) {

    //POPULANDO USUARIO
    this.usuario.nome = newClient.nome;
    this.usuario.email = newClient.email;
    this.usuario.usuario = this.formatService.pegarUsuarioEmail(newClient.email);
    this.usuario.ativo = 2;
    this.usuario.perfil = 'cliente';
    this.usuario.datacriacao = newClient.dtcriacao;
    this.usuario.dataalteracao = newClient.dtmodificacao;
    this.usuario.usuariocriacao = newClient.usuariocriacao;
    this.usuario.usuarioalteracao = newClient.usuarioalteracao;
    this.usuario.senha = 'cliente123';

    //POPULANDO PESSOA
    this.pessoa.nome = newClient.nome;
    this.pessoa.cpf = newClient.cgccfo;
    this.pessoa.dtnascimento = dtnascimento;
    this.pessoa.rua = newClient.rua;
    this.pessoa.numero = newClient.numero;
    this.pessoa.complemento = newClient.complemento;
    this.pessoa.bairro = newClient.bairro;
    this.pessoa.naturalidade = newClient.cidade;
    this.pessoa.nacionalidade = newClient.pais;
    this.pessoa.usuario = this.usuario.usuario;
    this.pessoa.nroidentidade = null!;
    this.pessoa.orgaoemissorident = null!;
    this.pessoa.estadoemissorident = newClient.codetd;
    this.pessoa.zusuario_usuario = this.usuario.usuario;
    this.pessoa.dtcriacao = newClient.dtcriacao;
    this.pessoa.dtalteracao = newClient.dtmodificacao;
    this.pessoa.usuariocriacao = newClient.usuariocriacao;
    this.pessoa.usuarioalteracao = newClient.usuarioalteracao;



    //CRIAR USUARIO
    this.usuarioService.registerUser(this.usuario)
      .pipe(
        catchError(err => {
          console.error(err)
          return of();
        })
      ).subscribe((data) => {
        console.log('cadastrou usuario')
        this.pessoaService.registerPessoa(this.pessoa)
          .pipe(
            catchError(err => {
              console.error(err)
              return of();
            })
          ).subscribe((data) => {
            console.log('cadastrou Pessoa')
          })
      })

    return this.httpClient.post<CreateClient>(this.url, newClient)

  }
}
