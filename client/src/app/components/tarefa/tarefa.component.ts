import { FormControl, FormsModule, NgForm, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormatsService } from '../../services/formats.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule,NgxMaskDirective],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss',
})
export class TarefaComponent {
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
    inputValue: '',
  };

  event = 'Cadastrar';

  constructor(private formatService: FormatsService,private tarefaService: TarefaService,private router: Router,private route: ActivatedRoute, private el: ElementRef) {
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
            (this.tarefa.usuarioalteracao = data.USUARIOALTERACAO);

            this.tarefa.datacriacao = this.formatService.formatDate(data.DATACRIACAO!);
          this.tarefa.dataalteracao = this.formatService.formatDate(data.DATAALTERACAO!);
          //this.tarefa.horasestimadas = this.formatService.formatHours(data.horasestimadas);
        });

      this.event = 'Editar';
    }
  }
  registerTarefa(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.tarefa.titulotarefa ||
      !this.tarefa.descricaotarefa ||
      !this.tarefa.horasestimadas
      // !this.tarefa.datacriacao ||
      // !this.tarefa.dataalteracao ||
      // !this.tarefa.usuariocriacao ||
      // !this.tarefa.usuarioalteracao
    ) {
      alert('Preencha todos os campos');
      console.log(this.tarefa);
      this.camposPreenchidos = (
        form.controls['titulotarefa'].valid &&
        form.controls['descricaotarefa'].valid &&
        form.controls['horasestimadas'].valid

      );
      this.botaoClicado = true;
      return;
    } else {
      alert('Formulário enviado!');
      console.log(this.tarefa);
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {
      this.tarefaService
        .registerTarefa({
          titulotarefa: this.tarefa.titulotarefa,
          descricaotarefa: this.tarefa.descricaotarefa,
          horasestimadas: this.tarefa.horasestimadas.toString(),
          datacriacao: this.tarefa.datacriacao,
          dataalteracao: this.tarefa.dataalteracao,
          usuariocriacao: this.tarefa.usuariocriacao,
          usuarioalteracao: this.tarefa.usuarioalteracao,
        })
        .subscribe(() => {
          this.router.navigate(['/user/tarefa']);
        });
    } else if (this.event === 'Editar') {
      console.log('editando');

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
        })
        .subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/user/tarefa']);
        });
    } else {
      alert('Error!');
    }
  }
}