import { Component } from '@angular/core';
import { Subject, catchError, of } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MensageriaService } from '../../../services/mensageria.service';
import { TipoRecursoService } from '../../../services/tipoRecurso.service';
import { FormatsService } from '../../../services/formats.service';

@Component({
  selector: 'app-tipoRecurso',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './tipoRecurso.component.html',
  styleUrl: './tipoRecurso.component.scss'
})
export class TipoRecursoComponent {
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  tipoRecurso = {
    
    idtipo: 0,
    descricao: '',
    dtcriacao : '',
    dtmodificacao : '',
    usuariocriacao : '',
    usuarioalteracao :''

  };

  event = 'Cadastrar';

  constructor(
    private formatService: FormatsService,
    private TipoRecursoService: TipoRecursoService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private messageriaService: MensageriaService
  ) {
    this.tipoRecurso.idtipo = this.route.snapshot.params['id'];
  }

  ngOnInit() {

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.TipoRecursoService
        .tipoRecursoCurrent(this.route.snapshot.params['id'])
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
        )
        .subscribe((datas: any) => {
          const data = datas[0];
          (this.tipoRecurso.descricao = data.DESCRICAO);
          this.tipoRecurso.dtcriacao = this.formatService.format(data.DTCRIACAO!, null, "dateTime");
          this.tipoRecurso.dtmodificacao = this.formatService.format(data.DTMODIFICACAO!, null, "dateTime");
          this.tipoRecurso.usuariocriacao = data.USUARIOCRIACAO;
          this.tipoRecurso.usuarioalteracao = data.USUARIOALTERACAO;
        });
      this.event = 'Editar';
    }
  }
  registerTipoRecurso(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.tipoRecurso.descricao
    ) {
      alert('preencha os campos');
      this.camposPreenchidos = (
        form.controls['tipoRecurso'].valid 

      );
      this.botaoClicado = true;
      return;
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {
      this.tipoRecurso.dtcriacao = this.formatService.dateNow();
      this.tipoRecurso.dtmodificacao = this.formatService.dateNow();
      this.tipoRecurso.usuariocriacao = localStorage.getItem('user')!;
      this.tipoRecurso.usuarioalteracao = localStorage.getItem('user')!;

      this.TipoRecursoService.registerTipoRecurso({
          descricao: this.tipoRecurso.descricao,
          dtcriacao: this.tipoRecurso.dtcriacao,
          dtmodificacao: this.tipoRecurso.dtmodificacao,
          usuariocriacao: this.tipoRecurso.usuariocriacao,
          usuarioalteracao: this.tipoRecurso.usuarioalteracao,
        }).pipe(
          catchError(err => {
            this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        ).subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/recurso']);
        });
    } else if (this.event === 'Editar') {
      this.tipoRecurso.dtmodificacao = this.formatService.dateNow();
      this.tipoRecurso.usuarioalteracao = localStorage.getItem('user')!;

      this.TipoRecursoService.editTipoRecurso(this.tipoRecurso)
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
        ).subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/recurso']);
        });
    } else {
      alert('Error!');
    }
  }
}
