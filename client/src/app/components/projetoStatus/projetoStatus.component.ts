import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormatsService } from '../../services/formats.service';
import { ProjetoStatusService } from '../../services/projetoStatus.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projeto-status',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './projetoStatus.component.html',
  styleUrl: './projetoStatus.component.scss'
})
export class ProjetoStatusComponent {
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;
  
  projetoStatus = {
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
    private projetoStatusService: ProjetoStatusService, 
    private router: Router, private route: ActivatedRoute) {
    
    this.projetoStatus.idstatus = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.projetoStatusService.projetoStatusCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];

          this.projetoStatus.titulo = data.TITULO,
          this.projetoStatus.descricao = data.DESCRICAO,
          this.projetoStatus.datacriacao = data.DATACRIACAO,
          this.projetoStatus.dataalteracao = data.DATAALTERACAO,
          this.projetoStatus.usuariocriacao = data.USUARIOCRIACAO,
          this.projetoStatus.usuarioalteracao = data.USUARIOALTERACAO,
          this.projetoStatus.status = data.STATUS

          this.projetoStatus.datacriacao = this.formatService.formatDate(data.DATACRIACAO!);
          this.projetoStatus.dataalteracao = this.formatService.formatDate(data.DATAALTERACAO!);
        })
      this.event = "Editar"
    }
  }

  registerProjeto(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.projetoStatus.titulo ||
      !this.projetoStatus.descricao ||
      !this.projetoStatus.status
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
      this.projetoStatus.datacriacao = this.formatService.dateNow();
      this.projetoStatus.dataalteracao = this.formatService.dateNow();
      this.projetoStatus.usuariocriacao = localStorage.getItem('user')!;
      this.projetoStatus.usuarioalteracao = localStorage.getItem('user')!;

      this.projetoStatusService.registerProjetoStatus({
        titulo: this.projetoStatus.titulo,
        descricao: this.projetoStatus.descricao,
        datacriacao: this.projetoStatus.datacriacao,
        dataalteracao: this.projetoStatus.dataalteracao,
        usuariocriacao: this.projetoStatus.usuariocriacao,
        usuarioalteracao: this.projetoStatus.usuarioalteracao,
        status: this.projetoStatus.status
}).subscribe(() => {this.router.navigate(['/user/projetoStatus']) })
    } else if (this.event === "Editar") {
      this.projetoStatus.dataalteracao = this.formatService.dateNow();
      this.projetoStatus.usuarioalteracao = localStorage.getItem('user')!;

      this.projetoStatusService.editProjetoStatus({

        idstatus: parseInt(this.projetoStatus.idstatus),
        titulo: this.projetoStatus.titulo,
        descricao: this.projetoStatus.descricao,
        datacriacao: this.projetoStatus.datacriacao,
        dataalteracao: this.projetoStatus.dataalteracao,
        usuariocriacao: this.projetoStatus.usuariocriacao,
        usuarioalteracao: this.projetoStatus.usuarioalteracao,
        status: this.projetoStatus.status
      }).subscribe((data : any) => {
        console.log(data)
        this.router.navigate(['/user/projetoStatus']) 
      })

    } else {
      alert("Error!")
    }
  }
}
