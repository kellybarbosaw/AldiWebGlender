import { Component } from '@angular/core';
import { TarefaStatusService } from '../../services/tarefaStatus.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormatsService } from '../../services/formats.service';

@Component({
  selector: 'app-tarefaStatus',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tarefa-status.component.html', 
  template: `<input type="date" [(ngModel)]="tarefaStatus.datacriacao | date:'yyyy-MM-dd'">`,
  styleUrl: './tarefa-status.component.scss'
})
export class TarefaStatusComponent {
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;
  
  tarefaStatus = {
    idstatus: '',
    titulo: '',
    descricao:'',
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao:'',
    usuarioalteracao:'',
    status: 0
}

event = 'Cadastrar';

  constructor(private formatService: FormatsService, 
    private tarefaStatusService: TarefaStatusService, 
    private router: Router, private route: ActivatedRoute) {
    
    this.tarefaStatus.idstatus = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.tarefaStatusService.tarefaStatusCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];

          this.tarefaStatus.titulo = data.TITULO,
          this.tarefaStatus.descricao = data.DESCRICAO,
          this.tarefaStatus.datacriacao = data.DATACRIACAO,
          this.tarefaStatus.dataalteracao = data.DATAALTERACAO,
          this.tarefaStatus.usuariocriacao = data.USUARIOCRIACAO,
          this.tarefaStatus.usuarioalteracao = data.USUARIOALTERACAO,
          this.tarefaStatus.status = data.STATUS

          this.tarefaStatus.datacriacao = this.formatService.formatDate(data.DATACRIACAO!);
          this.tarefaStatus.dataalteracao = this.formatService.formatDate(data.DATAALTERACAO!);
        })
      this.event = "Editar"
    }
  }

  registerTarefa(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.tarefaStatus.titulo ||
      !this.tarefaStatus.descricao ||
      !this.tarefaStatus.status 
    ) {
      alert('Preencha todos os campos');
      this.camposPreenchidos = (
        form.controls['titulo'].valid &&
        form.controls['descricao'].valid &&
        form.controls['status'].valid

      );
      this.botaoClicado = true;
      return;
    } else {
      alert("Formulário enviado!");
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {
      this.tarefaStatus.datacriacao = this.formatService.dateNow();
      this.tarefaStatus.dataalteracao = this.formatService.dateNow();
      this.tarefaStatus.usuariocriacao = localStorage.getItem('user')!;
      this.tarefaStatus.usuarioalteracao = localStorage.getItem('user')!;

      this.tarefaStatusService.registerTarefaStatus({
        titulo: this.tarefaStatus.titulo,
        descricao: this.tarefaStatus.descricao,
        datacriacao: this.tarefaStatus.datacriacao,
        dataalteracao: this.tarefaStatus.dataalteracao,
        usuariocriacao: this.tarefaStatus.usuariocriacao,
        usuarioalteracao: this.tarefaStatus.usuarioalteracao,
        status: this.tarefaStatus.status
}).subscribe(() => {this.router.navigate(['/user/tarefaStatus']) })
    } else if (this.event === "Editar") {
      this.tarefaStatus.dataalteracao = this.formatService.dateNow();
      this.tarefaStatus.usuarioalteracao = localStorage.getItem('user')!;

      this.tarefaStatusService.editTarefaStatus({

        idstatus: parseInt(this.tarefaStatus.idstatus),
        titulo: this.tarefaStatus.titulo,
        descricao: this.tarefaStatus.descricao,
        datacriacao: this.tarefaStatus.datacriacao,
        dataalteracao: this.tarefaStatus.dataalteracao,
        usuariocriacao: this.tarefaStatus.usuariocriacao,
        usuarioalteracao: this.tarefaStatus.usuarioalteracao,
        status: this.tarefaStatus.status
      }).subscribe((data : any) => {
        console.log(data)
        this.router.navigate(['/user/tarefaStatus']) })

    } else {
      alert("Error!")
    }
  }
}
