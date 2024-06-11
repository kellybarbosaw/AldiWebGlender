import { KanbanComponent } from './../../kanban/kanban.component';
import { FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { TarefaService } from '../../../services/tarefa.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormatsService } from '../../../services/formats.service';
import { NgxMaskDirective } from 'ngx-mask';
import { Subject, catchError, of } from 'rxjs';
import { MensageriaService } from '../../../services/mensageria.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule,NgxMaskDirective],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss',
})
export class TarefaComponent {
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  tarefa = {
    idtarefa: '',
    titulotarefa: '',
    descricaotarefa: '',
    horasestimadas: '',
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    status: 0
  };

  event = 'Cadastrar';

  constructor(
    private formatService: FormatsService,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute, 
    private el: ElementRef,
    private loginService: LoginService,
    private messageriaService: MensageriaService) {
    this.tarefa.idtarefa = this.route.snapshot.params['id'];

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.tarefaService
        .tarefaCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];
            (this.tarefa.titulotarefa = data.TITULOTAREFA),
            (this.tarefa.descricaotarefa = data.DESCRICAOTAREFA),
            (this.tarefa.horasestimadas = data.HORASESTIMADAS),
            (this.tarefa.datacriacao = data.DATACRIACAO),
            (this.tarefa.dataalteracao = data.DATAALTERACAO),
            (this.tarefa.usuariocriacao = data.USUARIOCRIACAO),
            (this.tarefa.usuarioalteracao = data.USUARIOALTERACAO),
            (this.tarefa.status = data.STATUS);

            this.tarefa.datacriacao = this.formatService.formatDate(data.DATACRIACAO!);
          this.tarefa.dataalteracao = this.formatService.formatDate(data.DATAALTERACAO!);
        });

      this.event = 'Editar';
    }
  }


  registerTarefa(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.tarefa.titulotarefa ||
      !this.tarefa.descricaotarefa ||
      !this.tarefa.horasestimadas ||
      !this.tarefa.status 
    ) {
      alert('Preencha todos os campos');
      this.camposPreenchidos = (
        form.controls['titulotarefa'].valid &&
        form.controls['descricaotarefa'].valid &&
        form.controls['horasestimadas'].valid &&
        form.controls['status'].valid

      );
      this.botaoClicado = true;
      return;
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {
      this.tarefa.datacriacao = this.formatService.dateNow();
      this.tarefa.dataalteracao = this.formatService.dateNow();
      this.tarefa.usuariocriacao = localStorage.getItem('user')!;
      this.tarefa.usuarioalteracao = localStorage.getItem('user')!;

      this.tarefaService
        .registerTarefa({
          titulotarefa: this.tarefa.titulotarefa,
          descricaotarefa: this.tarefa.descricaotarefa,
          horasestimadas: this.tarefa.horasestimadas.toString(),
          datacriacao: this.tarefa.datacriacao,
          dataalteracao: this.tarefa.dataalteracao,
          usuariocriacao: this.tarefa.usuariocriacao,
          usuarioalteracao: this.tarefa.usuarioalteracao,
          status: this.tarefa.status
        }).pipe(
          catchError(err => {
            this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
            // alert(err.error.message)
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        ).subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/tarefas']);
        });
    } else if (this.event === 'Editar') {
      this.tarefa.dataalteracao = this.formatService.dateNow();
      this.tarefa.usuarioalteracao = localStorage.getItem('user')!;

      this.tarefaService
        .editTarefa({
          idtarefa: this.tarefa.idtarefa,
          titulotarefa: this.tarefa.titulotarefa,
          descricaotarefa: this.tarefa.descricaotarefa,
          horasestimadas: this.tarefa.horasestimadas.toString(),
          datacriacao: this.tarefa.datacriacao,
          dataalteracao: this.tarefa.dataalteracao,
          usuariocriacao: this.tarefa.usuariocriacao,
          usuarioalteracao: this.tarefa.usuarioalteracao,
          status: this.tarefa.status
        }).pipe(
          catchError(err => {
            this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
            // alert(err.error.message)
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        )
        .subscribe((data: any) => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/tarefas']);
        });
    } else {
      alert('Error!');
    }
  }
}