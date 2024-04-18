import { Component } from '@angular/core';
import { ProjetoTarefaService } from '../../services/projetoTarefa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormatsService } from '../../services/formats.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-projetoTarefa',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,NgxMaskDirective],
  templateUrl: './projeto-tarefa.component.html',
  styleUrl: './projeto-tarefa.component.scss',
})
export class ProjetoTarefaComponent {
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  projetoTarefa = {
    idprojetotarefa:'',
    idtarefa: '',
    idprojeto: '',
    statustarefa: '',
    titulotarefa: '',
    descricaotarefa: '',
    datainicioprevista: '',
    datafimprevista: '',
    dtcriacao: '',
    dtalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    horasestimadas: '',
    horasgastas: '',
    saldohoras: '',
    etapa: ''
  };

  event = 'Cadastrar';

  constructor(
    private projetoTarefaService: ProjetoTarefaService,
    private formatService: FormatsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projetoTarefa.idprojetotarefa = this.route.snapshot.params['id'];

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.projetoTarefaService
        .projetoTarefaCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any[]) => {

          const data = datas[0];
            (this.projetoTarefa.idtarefa = data.IDTAREFA),
            (this.projetoTarefa.idprojeto = data.IDPROJETO),
            (this.projetoTarefa.statustarefa = data.STATUSTAREFA),
            (this.projetoTarefa.titulotarefa = data.TITULOTAREFA),
            (this.projetoTarefa.descricaotarefa = data.DESCICAOTAREFA),
            (this.projetoTarefa.datainicioprevista = data.DATAINICIOIMPREVISTA),
            (this.projetoTarefa.datafimprevista = data.DATAFIMPREVISTA),
            (this.projetoTarefa.dtcriacao = data.DTCRIACAO),
            (this.projetoTarefa.dtalteracao = data.DTALTERACAO),
            (this.projetoTarefa.usuariocriacao = data.USUARIOCRIACAO),
            (this.projetoTarefa.usuarioalteracao = data.USUARIOALTERACAO),
            (this.projetoTarefa.horasestimadas = data.HORASESTIMADAS),
            (this.projetoTarefa.horasgastas = data.HORASGASTAS),
            (this.projetoTarefa.saldohoras = data.SALDOHORAS),
            (this.projetoTarefa.etapa = data.ETAPA);

            this.projetoTarefa.datainicioprevista = this.formatService.formatDate(data.DATAINICIOIMPREVISTA!);
            this.projetoTarefa.datafimprevista = this.formatService.formatDate(data.DATAFIMPREVISTA!);
        });
      // console.log(this.pessoa)
      this.event = 'Editar';
    }
  }
  registerProjetoTarefa(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.projetoTarefa.titulotarefa ||
      !this.projetoTarefa.descricaotarefa ||
      !this.projetoTarefa.datainicioprevista ||
      !this.projetoTarefa.datafimprevista ||
      !this.projetoTarefa.horasestimadas ||
      !this.projetoTarefa.horasgastas ||
      !this.projetoTarefa.saldohoras ||
      !this.projetoTarefa.etapa
    ) {
      alert('Preencha todos os campos');
      this.camposPreenchidos = (
        form.controls['titulotarefa'].valid &&
        form.controls['descricaotarefa'].valid &&
        form.controls['datainicioprevista'].valid &&
        form.controls['datafimprevista'].valid &&
        form.controls['horasestimadas'].valid &&
        form.controls['horasgastas'].valid &&
        form.controls['saldohoras'].valid &&
        form.controls['etapa'].valid
      );
      this.botaoClicado = true;
      return;
    } else {
      alert('Formulário enviado!');
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {
      this.projetoTarefa.dtcriacao = this.formatService.dateNow();
      this.projetoTarefa.dtalteracao = this.formatService.dateNow();
      this.projetoTarefa.usuariocriacao = localStorage.getItem('user')!;
      this.projetoTarefa.usuarioalteracao = localStorage.getItem('user')!;

      this.projetoTarefaService
        .registerProjetoTarefa({
          idtarefa: this.projetoTarefa.idtarefa,
          idprojeto: this.projetoTarefa.idprojeto,
          statustarefa: this.projetoTarefa.statustarefa,
          titulotarefa: this.projetoTarefa.titulotarefa,
          descricaotarefa: this.projetoTarefa.descricaotarefa,
          datainicioprevista: this.projetoTarefa.datainicioprevista,
          datafimprevista: this.projetoTarefa.datafimprevista,
          dtcriacao: this.projetoTarefa.dtcriacao,
          dtalteracao: this.projetoTarefa.dtalteracao,
          usuariocriacao: this.projetoTarefa.usuariocriacao,
          usuarioalteracao: this.projetoTarefa.usuarioalteracao,
          horasestimadas: this.projetoTarefa.horasestimadas.toString(),
          horasgastas: this.projetoTarefa.horasgastas.toString(),
          saldohoras: this.projetoTarefa.saldohoras.toString(),
          etapa: this.projetoTarefa.etapa,
        })
        .subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/user/projetoTarefa']);
        });
    } else if (this.event === 'Editar') {
      this.projetoTarefa.dtalteracao = this.formatService.dateNow();
      this.projetoTarefa.usuarioalteracao = localStorage.getItem('user')!;

      this.projetoTarefaService

        .editProjetoTarefa({

          idprojetotarefa: this.projetoTarefa.idprojetotarefa,
          idtarefa: this.projetoTarefa.idtarefa,
          idprojeto: this.projetoTarefa.idprojeto,
          statustarefa: this.projetoTarefa.statustarefa,
          titulotarefa: this.projetoTarefa.titulotarefa,
          descricaotarefa: this.projetoTarefa.descricaotarefa,
          datainicioprevista: this.projetoTarefa.datainicioprevista,
          datafimprevista: this.projetoTarefa.datafimprevista,
          dtcriacao: this.projetoTarefa.dtcriacao,
          dtalteracao: this.projetoTarefa.dtalteracao,
          usuariocriacao: this.projetoTarefa.usuariocriacao,
          usuarioalteracao: this.projetoTarefa.usuarioalteracao,
          horasestimadas: this.projetoTarefa.horasestimadas.toString(),
          horasgastas: this.projetoTarefa.horasgastas.toString(),
          saldohoras: this.projetoTarefa.saldohoras.toString(),
          etapa: this.projetoTarefa.etapa
          
        })
        .subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/user/projetoTarefa']);
        });
    } else {
      alert('Error!');
    }
  }
}