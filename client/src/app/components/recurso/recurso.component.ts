import { FormatsService } from './../../services/formats.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-recurso',
  standalone: true,
  imports: [FormsModule,HttpClientModule,FormsModule,CommonModule,RouterOutlet],
  templateUrl: './recurso.component.html',
  styleUrl: './recurso.component.scss'
})

export class RecursoComponent {
  
  recurso = {
    idrecurso: '',
    idpessoa: 0,
    tiporecurso: '',
    datainicio: '',
    datafim:'',
    datacriacao:'',
    dataalteracao:'',
    usuariocriacao:'',
    usuarioalteracao:'',
    ativo: 0,
    valorhr: 0

  }
  event = 'Cadastrar';

  constructor(private formatService: FormatsService, private recursoService: RecursoService, private router: Router, private route: ActivatedRoute) {

    this.recurso.idrecurso = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.recursoService.recursoCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];

          this.recurso.idpessoa = data.IDPESSOA,
          this.recurso.tiporecurso = data.TIPORECURSO,
          this.recurso.datainicio = data.DATAINICIO,
          this.recurso.datafim = data.DATAFIM,
          this.recurso.datacriacao = data.DATACRIACAO,
          this.recurso.dataalteracao = data.DATAALTERACAO,
          this.recurso.usuariocriacao = data.USUARIOCRIACAO,
          this.recurso.usuarioalteracao = data.USUARIOALTERACAO,
          this.recurso.ativo = data.ATIVO,
          this.recurso.valorhr= data.VALORHR

          this.recurso.datainicio = this.formatService.formatDate(data.DATAINICIO!);
          this.recurso.datafim = this.formatService.formatDate(data.DATAFIM!);
          this.recurso.datacriacao = this.formatService.formatDate(data.DATACRIACAO!);
          this.recurso.dataalteracao = this.formatService.formatDate(data.DATAALTERACAO!);

          this.formatService.ativo(data.ATIVO!);
        })
        
      this.event = "Editar"
    }
  }

  registerRecurso() {

    // //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.recurso.idpessoa ||
      !this.recurso.tiporecurso ||
      !this.recurso.datainicio ||
      !this.recurso.datafim ||
      !this.recurso.datacriacao ||
      !this.recurso.dataalteracao ||
      !this.recurso.usuariocriacao ||
      !this.recurso.usuarioalteracao ||
      !this.recurso.ativo ||
      !this.recurso.valorhr
    ) {
      alert("Preencha todos os campos");
      return;
    } else {
      alert("Formulário enviado!");
    }
    
    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {
      this.recursoService.registerRecurso({

      idpessoa: this.recurso.idpessoa,
      tiporecurso: parseInt(this.recurso.tiporecurso),
      datainicio: this.recurso.datainicio,
      datafim: this.recurso.datafim,
      datacriacao: this.recurso.datacriacao,
      dataalteracao: this.recurso.dataalteracao,
      usuariocriacao: this.recurso.usuariocriacao,
      usuarioalteracao: this.recurso.usuarioalteracao,
      ativo: this.recurso.ativo,
      valorhr: this.recurso.valorhr!

}).subscribe(() => {this.router.navigate(['/user/recurso']) })
    } else if (this.event === "Editar") {
      console.log("editando")

      this.recursoService.editRecurso({
        idrecurso: parseInt(this.recurso.idrecurso),
        idpessoa: this.recurso.idpessoa,
        tiporecurso: parseInt(this.recurso.tiporecurso),
        datainicio: this.recurso.datainicio,
        datafim: this.recurso.datafim,
        datacriacao: this.recurso.datacriacao,
        dataalteracao: this.recurso.dataalteracao,
        usuariocriacao: this.recurso.usuariocriacao,
        usuarioalteracao: this.recurso.usuarioalteracao,
        ativo: this.recurso.ativo,
        valorhr: this.recurso.valorhr

      }).subscribe((data : any) => {
        console.log(data)
        this.router.navigate(['/user/recurso']) })
        console.log(this.recurso.datainicio)
    } else {
      alert("Error!")
    }
  }
}
