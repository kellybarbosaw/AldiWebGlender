import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'
import { catchError, Observable, of, Subject } from 'rxjs';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';
import { LoginService } from '../../../services/login.service';
import { NgxMaskPipe } from 'ngx-mask';
import { MensageriaService } from '../../../services/mensageria.service';
import { ProjectsComponent } from "../../backup/projects/projects.component";
@Component({
  selector: 'app-pesquisa-clientes',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink, NgxMaskPipe, ProjectsComponent],
  templateUrl: './pesquisa-clientes.component.html',
  styleUrl: './pesquisa-clientes.component.scss'
})
export class PesquisaClientesComponent {

  error$ = new Subject<boolean>();
  allClient$ = new Observable<Client[]>();
  clientExclude = 0;

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas: number[] = [];
  qtdClients = 0;
  qtdMostrado = 5;

  clientEscolhido = {
    idcliente: 0,
    nome: ''
  }

  @Output() enviaCliente = new EventEmitter<{nome:string; idcliente:number}>()

  constructor(
    private clientService: ClientService,
    private loginService: LoginService,
    private messageriaService: MensageriaService) { }
  ngOnInit() {
    this.paginas = [];
    this.clientService.getClientsWithHeaders(this.offset, this.limit)
      .pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      ).subscribe({
        next: (result) => {
          this.allClient$ = this.clientService.allClientsS$;
          this.qtdClients = parseInt(result.headers?.get('Quantidades_Registros')!);

          for (let index = 1; index <= Math.ceil(this.qtdClients / this.limit); index++) {
            this.paginas.push(index);
          }
          if (this.qtdMostrado > this.qtdClients) this.qtdMostrado = this.qtdClients

        },
        error: (err) => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
        }
      });
  }

  buscar() {
    this.offset = 0;
    this.paginar(1)
  }

  paginar(pagina: number) {
    this.paginaAtual = pagina;
    let of = pagina - 1
    this.offset = (of * this.limit);
    this.qtdMostrado = (pagina * this.limit)
    if (this.qtdMostrado > this.qtdClients) this.qtdMostrado = this.qtdClients
    this.ngOnInit()
  }

  passar(type: string) {
    switch (type) {
      case 'next':
        if (this.paginaAtual >= this.paginas.length) return
        this.paginaAtual += 1;
        this.paginar(this.paginaAtual)
        break;
      case 'back':
        if (this.paginaAtual === 1) return
        this.paginaAtual -= 1;
        this.paginar(this.paginaAtual)
        break;
    }
  }

  selecionarCliente(nome: string, id: number) {
    this.clientEscolhido.idcliente = id
    this.clientEscolhido.nome = nome

    this.dipararEventClienteEscolhido()
  }

  dipararEventClienteEscolhido(): void {
    this.enviaCliente.emit(this.clientEscolhido)
  }

}
