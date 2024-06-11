import { Component } from '@angular/core';
import { Subject, Observable, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { Recursos } from '../../../models/recurso.model';
import { LoginService } from '../../../services/login.service';
import { MensageriaService } from '../../../services/mensageria.service';
import { RecursoService } from '../../../services/recurso.service';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskPipe],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.scss',
})
export class RecursosComponent {
  error$ = new Subject<boolean>();
  allRecurso$ = new Observable<Recursos[]>();
  recursoExclude = 0;

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas:number[] = [];
  qtdRecursos = 0;
  qtdMostrado = 5;

  constructor(
    private recursoService: RecursoService,
    private loginService: LoginService,
    private messageriaService: MensageriaService
    ){

  }
  ngOnInit() {
    this.paginas = [];
    this.recursoService.getRecursosWithHeaders(this.offset, this.limit).pipe(
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
        this.allRecurso$ = this.recursoService.allRecursos$;
        this.qtdRecursos = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdRecursos/this.limit) ; index++) {
          this.paginas.push(index);
        }
        if(this.qtdMostrado > this.qtdRecursos) this.qtdMostrado = this.qtdRecursos

      },
      error: (err) => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
      }
    });
  }

  event ="Excluir";
  excludeRecurso(id:number,event:string|null){
    if(!event)this.recursoExclude = id;
    if(event === 'clear') this.recursoExclude = 0;
  }

  deletRecurso(id: number) {
    this.recursoService.deleteRecurso(id)
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
    if(this.qtdMostrado > this.qtdRecursos) this.qtdMostrado = this.qtdRecursos
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