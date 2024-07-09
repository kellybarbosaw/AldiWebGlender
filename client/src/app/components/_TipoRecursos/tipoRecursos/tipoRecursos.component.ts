import { Component } from '@angular/core';
import { Subject, Observable, catchError, of } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MensageriaService } from '../../../services/mensageria.service';
import { TipoRecursoService } from '../../../services/tipoRecurso.service';
import { TipoRecursos } from '../../../models/tipoRecurso.model';

@Component({
  selector: 'app-tipoRecursos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tipoRecursos.component.html',
  styleUrl: './tipoRecursos.component.scss'
})
export class TipoRecursosComponent {
  
  error$ = new Subject<boolean>();

  allTipoRecurso$ = new Observable<TipoRecursos[]>();
  tipoRecursoExclude = 0;

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas:number[] = [];
  qtdTipoRecursos = 0;
  qtdMostrado = 5;

  constructor(
    private TipoRecursoService: TipoRecursoService, 
    private loginService: LoginService,
    private messageriaService: MensageriaService){

  }
  ngOnInit() {
    this.paginas = [];
    this.TipoRecursoService.getTipoRecursosWithHeaders(this.offset, this.limit).pipe(
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
        this.allTipoRecurso$ = this.TipoRecursoService.allTipoRecursos$;
        this.qtdTipoRecursos = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdTipoRecursos/this.limit) ; index++) {
          this.paginas.push(index);
        }
        if(this.qtdMostrado > this.qtdTipoRecursos) this.qtdMostrado = this.qtdTipoRecursos

      },
      error: (err) => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
      }
    });
  }

  event ="Excluir";
  excludeTipoRecurso(id: number, event: string | null){
    if (!event)this.tipoRecursoExclude = id;
    if (event === 'clear') this.tipoRecursoExclude = 0;
  }

  deletTipoRecurso(id: number) {
    this.TipoRecursoService.deleteTipoRecurso(id)
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
    if(this.qtdMostrado > this.qtdTipoRecursos) this.qtdMostrado = this.qtdTipoRecursos
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
