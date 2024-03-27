import { Component } from '@angular/core';
import { Subject, Observable, catchError, of } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Tarefa, Tarefas } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  constructor(private tarefaService: TarefaService, private loginService: LoginService){
    setTimeout(() => {

      this.allTarefa$ = this.tarefaService.allTarefa()
        .pipe(
          catchError(err => {
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        );

    }, 1000);
    // this.error$.next(true)

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
        alert(err.error.msg)
        return of();
      })
    ).subscribe(() => { this.allTarefa$ = this.tarefaService.allTarefa() })
  }
}
