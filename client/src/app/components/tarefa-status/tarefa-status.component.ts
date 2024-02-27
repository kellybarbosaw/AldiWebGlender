import { Component } from '@angular/core';
import { TarefaStatusService } from '../../services/tarefaStatus.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  tarefaStatus = {
    idstatus: '',
    titulo: '',
    descricao:'',
    ativo: 2,
    concluido: 4,
    cancelado: 6,
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao:'',
    usuarioalteracao:'',
    atarefastatuscol: ''
    
}

event = 'Cadastrar';

  constructor(private formatService: FormatsService, private tarefaStatusService: TarefaStatusService, private router: Router, private route: ActivatedRoute) {

    

    this.tarefaStatus.idstatus = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.tarefaStatusService.tarefaStatusCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];

          this.tarefaStatus.titulo = data.TITULO,
          this.tarefaStatus.descricao = data.DESCRICAO,
          this.tarefaStatus.ativo = data.ATIVO,
          this.tarefaStatus.concluido = data.CONCLUIDO,
          this.tarefaStatus.cancelado = data.CANCELADO,
          this.tarefaStatus.datacriacao = data.DATACRIACAO,
          this.tarefaStatus.dataalteracao = data.DATAALTERACAO,
          this.tarefaStatus.usuariocriacao = data.USUARIOCRIACAO,
          this.tarefaStatus.usuarioalteracao = data.USUARIOALTERACAO,
          this.tarefaStatus.atarefastatuscol = data.ATAREFASTATUScol

          this.tarefaStatus.datacriacao = this.formatService.formatDate(data.DATACRIACAO!);
          this.tarefaStatus.dataalteracao = this.formatService.formatDate(data.DATAALTERACAO!);
        })
      this.event = "Editar"
    }
  }

  ngOnInit() {
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        // alert("teste NG ONinit")
        this.formatService.ativo(this.tarefaStatus.ativo)
        this.formatService.concluido(this.tarefaStatus.concluido)
        this.formatService.cancelado(this.tarefaStatus.cancelado)
      }
    }, 100);
  }
  registerTarefa() {
    /*
    console.log(this.tarefaStatus.titulo)
    console.log(this.tarefaStatus.descricao)
    console.log(this.tarefaStatus.ativo)
    console.log(this.tarefaStatus.concluido)
    console.log(this.tarefaStatus.cancelado)
    console.log(this.tarefaStatus.datacriacao)
    console.log(this.tarefaStatus.dataalteracao)
    console.log(this.tarefaStatus.usuariocriacao)
    console.log(this.tarefaStatus.usuarioalteracao)
    console.log(this.tarefaStatus.atarefastatuscol)
*/
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.tarefaStatus.titulo ||
      !this.tarefaStatus.ativo ||
      !this.tarefaStatus.descricao ||
      !this.tarefaStatus.concluido ||
      !this.tarefaStatus.cancelado ||
      !this.tarefaStatus.datacriacao ||
      !this.tarefaStatus.dataalteracao ||
      !this.tarefaStatus.usuariocriacao ||
      !this.tarefaStatus.usuarioalteracao ||
      !this.tarefaStatus.atarefastatuscol
    ) {
      alert("Preencha todos os campos");
      return;
    } else {
      alert("Formulário enviado!");
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {

      this.tarefaStatusService.registerTarefaStatus({
        titulo: this.tarefaStatus.titulo,
        descricao: this.tarefaStatus.descricao,
        ativo: this.tarefaStatus.ativo,
        concluido: this.tarefaStatus.concluido,
        cancelado: this.tarefaStatus.cancelado,
        datacriacao: this.tarefaStatus.datacriacao,
        dataalteracao: this.tarefaStatus.dataalteracao,
        usuariocriacao: this.tarefaStatus.usuariocriacao,
        usuarioalteracao: this.tarefaStatus.usuarioalteracao,
        atarefastatuscol: this.tarefaStatus.atarefastatuscol
}).subscribe(() => {this.router.navigate(['/user/tarefaStatus']) })
    } else if (this.event === "Editar") {
      console.log("editando")

      this.tarefaStatusService.editTarefaStatus({

        idstatus: parseInt(this.tarefaStatus.idstatus),
        titulo: this.tarefaStatus.titulo,
        descricao: this.tarefaStatus.descricao,
        ativo: this.tarefaStatus.ativo,
        concluido: this.tarefaStatus.concluido,
        cancelado: this.tarefaStatus.cancelado,
        datacriacao: this.tarefaStatus.datacriacao,
        dataalteracao: this.tarefaStatus.dataalteracao,
        usuariocriacao: this.tarefaStatus.usuariocriacao,
        usuarioalteracao: this.tarefaStatus.usuarioalteracao,
        atarefastatuscol: this.tarefaStatus.atarefastatuscol
      }).subscribe((data : any) => {
        console.log(data)
        this.router.navigate(['/user/tarefaStatus']) })

    } else {
      alert("Error!")
    }
  }
}
