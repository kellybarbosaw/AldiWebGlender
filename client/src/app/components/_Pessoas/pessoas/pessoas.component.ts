import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pessoas } from '../../../models/pessoa.model';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../../services/pessoa.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgxMaskPipe } from 'ngx-mask';
import { MensageriaService } from '../../../services/mensageria.service';


@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskPipe],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent {

  error$ = new Subject<boolean>();

  allPessoa$ = new Observable<Pessoas[]>();
  pessoaExclude = 0;

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas:number[] = [];
  qtdPessoas = 0;
  qtdMostrado = 5;

  constructor(
    private pessoaService: PessoaService, 
    private loginService: LoginService,
    private messageriaService: MensageriaService
    ){

  }
  ngOnInit() {
    this.paginas = [];
    this.pessoaService.getPessoasWithHeaders(this.offset, this.limit).pipe(
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
        this.allPessoa$ = this.pessoaService.allPessoas$;
        this.qtdPessoas = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdPessoas/this.limit) ; index++) {
          this.paginas.push(index);
        }
        if(this.qtdMostrado > this.qtdPessoas) this.qtdMostrado = this.qtdPessoas

      },
      error: (err) => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
      }
    });
  }

  event ="Excluir";
  excludePessoa(id:number,event:string|null){
    if(!event)this.pessoaExclude = id;
    if(event === 'clear') this.pessoaExclude = 0;
  }

  deletPessoa(id: number) {
    this.pessoaService.deletePessoa(id)
    .pipe(
      catchError(err => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
        return of();
      })
    ).subscribe(() => { 
      this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Excluído Com Sucesso!', 'messages', 'success')
      this.ngOnInit() })
  }

  buscar() {
    this.offset = 0;
    this.paginar(1)
  }

  paginar(pagina: number) {
    this.paginaAtual = pagina;
    let of = pagina - 1
    this.offset = (of * this.limit);
    this.qtdMostrado = (pagina*this.limit)
    if(this.qtdMostrado > this.qtdPessoas) this.qtdMostrado = this.qtdPessoas
    this.ngOnInit()
  }

  passar(type:string){
    switch (type) {
      case 'next':
        if(this.paginaAtual >= this.paginas.length)return
        this.paginaAtual += 1;
        this.paginar(this.paginaAtual)     
        break;
      case 'back':
        if(this.paginaAtual === 1)return
        this.paginaAtual -= 1;
        this.paginar(this.paginaAtual)
        break;
    }
  }
}