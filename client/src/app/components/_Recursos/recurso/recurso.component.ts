
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { catchError, of, Subject, Observable } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Pessoas } from '../../../models/pessoa.model';
import { FormatsService } from '../../../services/formats.service';
import { LoginService } from '../../../services/login.service';
import { RecursoService } from '../../../services/recurso.service';
import { PessoaComponent } from '../../_Pessoas/pessoa/pessoa.component';
import { Recursos } from '../../../models/recurso.model';
import { MensageriaService } from '../../../services/mensageria.service';
import { TipoRecursoComponent } from '../../_TipoRecursos/tipoRecurso/tipoRecurso.component';
import { TipoRecursosComponent } from '../../_TipoRecursos/tipoRecursos/tipoRecursos.component';

@Component({
  selector: 'app-recurso',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    NgxMaskDirective,
    MatDialogModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './recurso.component.html',
  styleUrl: './recurso.component.scss',
})
export class RecursoComponent {
  [x: string]: any;
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  recurso = {
    idrecurso: 0,
    idpessoa: '',
    tiporecurso: '',
    datainicio: '',
    datafim: '',
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    ativo: 2,
    valorhr: 0
  };

  tipoRecurso$ = new Observable<Recursos[]>();
  zpessoas$ = new Observable<Pessoas[]>();

  event = 'Cadastrar';

  constructor(
    private formatService: FormatsService,
    private recursoService: RecursoService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    public dialog: MatDialog,
    private messageriaService: MensageriaService
  ) {
    this.recurso.idrecurso = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.zpessoas$ = this.recursoService.pessoaRecurso();
    this.tipoRecurso$ = this.recursoService.buscarTipoRecurso();

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.recursoService
        .recursoCurrent(this.route.snapshot.params['id'])
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
          console.log(data);

          (this.recurso.idpessoa = data.IDPESSOA),
            (this.recurso.tiporecurso = data.TIPORECURSO),
            (this.recurso.datainicio = data.DATAINICIO),
            (this.recurso.datafim = data.DATAFIM),
            (this.recurso.datacriacao = data.DATACRIACAO),
            (this.recurso.dataalteracao = data.DATAALTERACAO),
            (this.recurso.usuariocriacao = data.USUARIOCRIACAO),
            (this.recurso.usuarioalteracao = data.USUARIOALTERACAO),
            (this.recurso.ativo = data.ATIVO),
            (this.recurso.valorhr = data.VALORHR)

          this.recurso.datainicio = this.formatService.formatDate(
            data.DATAINICIO!
          );
          this.recurso.datafim = this.formatService.formatDate(data.DATAFIM!);
          this.recurso.datacriacao = this.formatService.formatDate(
            data.DATACRIACAO!
          );
          this.recurso.dataalteracao = this.formatService.formatDate(
            data.DATAALTERACAO!
          );
        });

      this.event = 'Editar';
    }
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        // alert("teste NG ONinit")
        this.formatService.ativo(this.recurso.ativo);
      }
    }, 100);
  }

  openPessoa() {
    const dialogRef = this.dialog.open(PessoaComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'dialog-with-scrollbar',
      data: { isModal: true },
    });
    dialogRef.componentInstance.isModal = true;
  }

  openTipoRecurso() {
    const dialogRef = this.dialog.open(TipoRecursoComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'dialog-with-scrollbar'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTipoRecursos() {
    const dialogRef = this.dialog.open(TipoRecursosComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'dialog-with-scrollbar'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  shouldHide = false;

  toggleHide() {
    this.shouldHide = !this.shouldHide;
  }
  registerRecurso(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.recurso.idpessoa ||
      !this.recurso.tiporecurso ||
      !this.recurso.datainicio ||
      // !this.recurso.datafim ||
      // !this.recurso.datacriacao ||
      // !this.recurso.dataalteracao ||
      // !this.recurso.usuariocriacao ||
      // !this.recurso.usuarioalteracao ||
      !this.recurso.ativo
    ) {
      alert('preencha os campos');
      this.camposPreenchidos =(
        form.controls['idpessoa'].valid &&
        form.controls['tiporecurso'].valid &&
        form.controls['datainicio'].valid &&
        //  form.controls['datafim'].valid &&
        //  form.controls['datacriacao'].valid &&
        //  form.controls['dataalteracao'].valid &&
        //  form.controls['usuariocriacao'].valid &&
        //  form.controls['usuarioalteracao'].valid &&
        form.controls['ativo'].valid
      );
      this.botaoClicado = true;
      console.log(this.camposPreenchidos)
      console.log(this.recurso)
      return;
    }

    // VALIDAÇÃO DA DATA
    if (new Date(this.recurso.datafim) < new Date(this.recurso.datainicio)) {
      alert('Data final deve ser posterior a data inicial.');
      return;
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {

      (this.recurso.datacriacao = this.formatService.dateNow()),
      (this.recurso.dataalteracao = this.formatService.dateNow()),
      (this.recurso.usuariocriacao = localStorage.getItem('user')!),
      (this.recurso.usuarioalteracao = localStorage.getItem('user')!);
      this.recursoService
        .registerRecurso({
          idpessoa: this.recurso.idpessoa,
          tiporecurso: this.recurso.tiporecurso,
          datainicio: this.recurso.datainicio,
          datafim: this.recurso.datafim,
          datacriacao: this.recurso.datacriacao,
          dataalteracao: this.recurso.dataalteracao,
          usuariocriacao: this.recurso.usuariocriacao,
          usuarioalteracao: this.recurso.usuarioalteracao,
          ativo: this.recurso.ativo,
          valorhr: this.recurso.valorhr!
        })
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
        .subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/recursos']);
        });

    } else if (this.event === 'Editar') {
      this.recurso.usuarioalteracao = localStorage.getItem('user')!;
      this.recurso.dataalteracao = this.formatService.dateNow();
      this.recursoService
        .editRecurso(this.recurso)
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
          this.router.navigate(['/user/recursos']);
        });
    } else {
      alert('Error!');
    }
  }
}
