import { Component } from '@angular/core';
import { Subject, Observable, catchError, of } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { Tarefa, Tarefas } from '../../../models/tarefa.model';
import { TarefaService } from '../../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MensageriaService } from '../../../services/mensageria.service';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss'
})
export class TarefasComponent {
  error$ = new Subject<boolean>();

  allTarefa$ = new Observable<Tarefas[]>();
  tarefaExclude = 0;

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas:number[] = [];
  qtdTarefas = 0;
  qtdMostrado = 5;

  constructor(
    private tarefaService: TarefaService, 
    private loginService: LoginService,
    private messageriaService: MensageriaService){

  }
  ngOnInit() {
    this.paginas = [];
    this.tarefaService.getTarefasWithHeaders(this.offset, this.limit).pipe(
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
        this.allTarefa$ = this.tarefaService.allTarefas$;
        this.qtdTarefas = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdTarefas/this.limit) ; index++) {
          this.paginas.push(index);
        }
        if(this.qtdMostrado > this.qtdTarefas) this.qtdMostrado = this.qtdTarefas

      },
      error: (err) => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
      }
    });
  }

  event ="Excluir";
  excludeTarefa(id: number, event: string | null){
    if (!event)this.tarefaExclude = id;
    if (event === 'clear') this.tarefaExclude = 0;
  }

  deletTarefa(id: number) {
    this.tarefaService.deleteTarefa(id)
    .pipe(
      catchError(err => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
        return of();
      })
      ).subscribe(() => { 
        this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
        this.ngOnInit()
       })
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
    if(this.qtdMostrado > this.qtdTarefas) this.qtdMostrado = this.qtdTarefas
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
