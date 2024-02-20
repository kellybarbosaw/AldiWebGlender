import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApontamentoService } from '../../services/apontamento.service';
import { FormatsService } from '../../services/formats.service';
import { AppComponent } from "../../app.component";

@Component({
    selector: 'app-apontamento',
    standalone: true,
    templateUrl: './apontamento.component.html',
    styleUrl: './apontamento.component.scss',
    providers: [FormatsService],
    imports: [FormsModule, HttpClientModule, FormsModule, CommonModule, RouterOutlet, AppComponent]
})

export class ApontamentoComponent {

  apontamento = {
    idapontamento: '',
    idprojetotarefa: '',
    data: '',
    horainicio : '',
    horafinal : '',
    descricao : '',
    dtcriacao : '',
    dtmodificacao : '',
    usuariocriacao : '',
    usuarioalteracao : ''
  }
  
  event = 'Cadastrar';

  constructor(private formatService: FormatsService, private apontamentoService: ApontamentoService, private router: Router, private route: ActivatedRoute) {

    this.apontamento.idapontamento = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.apontamentoService.apontamentoCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];
            this.apontamento.idprojetotarefa = data.IDPROJETOTAREFA,
            this.apontamento.data = data.DATA,
            this.apontamento.horainicio = data.HORAINICIO,
            this.apontamento.horafinal = data.HORAFINAL,
            this.apontamento.descricao = data.DESCRICAO,
            this.apontamento.dtcriacao  = data.DTCRIACAO,
            this.apontamento.dtmodificacao = data.DTMODIFICACAO,
            this.apontamento.usuariocriacao = data.USUARIOCRIACAO,
            this.apontamento.usuarioalteracao = data.USUARIOALTERACAO

            this.apontamento.data = this.formatService.formatDate(data.DATA!);
            this.apontamento.dtcriacao = this.formatService.formatDate(data.DTCRIACAO!);
            this.apontamento.dtmodificacao = this.formatService.formatDate(data.DTMODIFICACAO!);

            this.apontamento.horainicio = this.formatService.format(data.HORAINICIO, "horainicio", "time");
            this.apontamento.horafinal = this.formatService.format(data.HORAFINAL, "horafinal", "time");
        })
      this.event = "Editar"
    }
  }

  registerApontamento() {
/*
    // //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.apontamento.idprojetotarefa || 
      !this.apontamento.data || 
      !this.apontamento.horainicio ||
      !this.apontamento.horafinal || 
      !this.apontamento.descricao || 
      !this.apontamento.dtcriacao || 
      !this.apontamento.dtmodificacao || 
      !this.apontamento.usuariocriacao || 
      !this.apontamento.usuarioalteracao
    ) {
      alert("Preencha todos os campos");
      return;
    } else {
      alert("Formulário enviado!");
    }
    */
    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    var hr = this.apontamentoService.calcularHoras(this.apontamento.horainicio,this.apontamento.horafinal)
    console.log("hora: "+hr) 
    if (this.event === "Cadastrar") {
      this.apontamentoService.passartempoparaaprojetotarefa(`${hr}` , this.apontamento.idprojetotarefa)


      this.apontamentoService.registerApontamento({

        idprojetotarefa: parseInt(this.apontamento.idprojetotarefa),
        data: this.apontamento.data,
        horainicio: `${this.apontamento.data} ${this.apontamento.horainicio}`,
        horafinal: `${this.apontamento.data} ${this.apontamento.horafinal}`,
        descricao: this.apontamento.descricao,
        dtcriacao: this.apontamento.dtcriacao,
        dtmodificacao: this.apontamento.dtmodificacao,
        usuariocriacao: this.apontamento.usuariocriacao,
        usuarioalteracao: this.apontamento.usuarioalteracao

}).subscribe(() => {
  // this.router.navigate(['/user/apontamento']) 

})
    } else if (this.event === "Editar") {
      console.log("editando")

      this.apontamentoService.editApontamento({
        
        idapontamento: parseInt(this.apontamento.idapontamento),
        idprojetotarefa: parseInt(this.apontamento.idprojetotarefa),
        data: this.apontamento.data,
        horainicio: this.apontamento.horainicio,
        horafinal: this.apontamento.horafinal,
        descricao: this.apontamento.descricao,
        dtcriacao: this.apontamento.dtcriacao,
        dtmodificacao: this.apontamento.dtmodificacao,
        usuariocriacao: this.apontamento.usuariocriacao,
        usuarioalteracao: this.apontamento.usuarioalteracao

      }).subscribe((data : any) => {
        console.log(data)
        this.router.navigate(['/user/apontamento']) })
    } else {
      alert("Error!")
    }
  }
}
