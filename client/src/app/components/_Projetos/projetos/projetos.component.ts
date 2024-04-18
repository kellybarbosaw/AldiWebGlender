import { Component } from '@angular/core';
import { Observable, Subject, catchError, of } from 'rxjs';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormatsService } from '../../../services/formats.service';
import { MensageriaService } from '../../../services/mensageria.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent {
  error$ = new Subject<boolean>();
  allProjeto$ = new Observable<Project[]>();
  projetoExclude = 0;
  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas: number[] = [];
  qtdProjeto = 0;
  qtdMostrado = 5;

  constructor(
    private projectService: ProjectService,
    private loginService: LoginService,
    private messageriaService: MensageriaService) { }

    ngOnInit() {
      this.paginas = [];
      this.projectService.getProjectsWithHeaders(this.offset, this.limit)
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
          this.allProjeto$ = this.projectService.allProjeto$;
          this.qtdProjeto = parseInt(result.headers?.get('Quantidades_Registros')!);
  
          for (let index = 1; index <= Math.ceil(this.qtdProjeto / this.limit); index++) {
            this.paginas.push(index);
          }
          if (this.qtdMostrado > this.qtdProjeto) this.qtdMostrado = this.qtdProjeto
  
        },
        error: (err) => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
        }
      });
    }

  excludeProject(id: number, event: string | null) {
    if (!event) this.projetoExclude = id;
    if (event === 'clear') this.projetoExclude = 0;
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id)
      .pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Erro', err.error.message, 'messages', 'danger')
          return of();
        })
      ).subscribe(() => {
        this.messageriaService.messagesRequest('Sucesso!', 'Projeto Excluído Com Sucesso!', 'messages', 'success')
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
    this.qtdMostrado = (pagina * this.limit)
    if (this.qtdMostrado > this.qtdProjeto) this.qtdMostrado = this.qtdProjeto
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
}
