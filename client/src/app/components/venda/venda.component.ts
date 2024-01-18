import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../services/contract.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from "@angular/common";



@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})
export class VendaComponent {

  date:Date = new Date();

  datenow = '2024-01-16';


  contrato = {
    idvenda: 0,
    idcliente: 0,
    descricaovenda: '',
    statusvenda: 'Aguardando validação',
    idprojeto: 0,
    comercialvenda: '',

    dtcontato: '',
    dtcontrato: '',
    dtassinatura: '',
    dtconclusao: '',
    dtcriacao: this.datenow,
    dtalteracao: this.datenow,

    usuariocriacao: 'usuario logado',
    usuarioalteracao: 'usuario logado',
  }
  event = 'Cadastrar';

  constructor(private contractService: ContractService, private router: Router, private route: ActivatedRoute) {

    if (this.route.snapshot.params['event'] === 'new') {
      this.event = 'Cadastrar'
      this.contrato.idcliente = this.route.snapshot.params['id'];
    } else if (this.route.snapshot.params['event'] === 'edit') {
      this.event = 'Editar'
      this.contrato.idvenda = this.route.snapshot.params['id'];

      //realizar busca do contrato
      //popular  this contrato com as informações adquiridas

      this.contractService.contractCurrent(this.contrato.idvenda)
      .subscribe((datas)=>{
        const data = datas[0];
        this.contrato.idvenda = data.idvenda!;
        this.contrato.idcliente = data.idcliente;
        this.contrato.descricaovenda = data.descricaovenda;
        this.contrato.statusvenda = data.statusvenda;
        this.contrato.idprojeto = data.idprojeto!;
        this.contrato.comercialvenda = data.comercialvenda;
    
        this.contrato.dtcontato = data.dtcontato;
        this.contrato.dtcontrato = data.dtcontrato;
        this.contrato.dtassinatura = data.dtassinatura;
        this.contrato.dtconclusao =data.dtconclusao;
        this.contrato.dtalteracao = data.dtalteracao;
    
        this.contrato.usuariocriacao = data.usuariocriacao;
        this.contrato.usuarioalteracao = data.usuarioalteracao;

        // const datepipe: DatePipe = new DatePipe('short') ;
        // let formattedDate = datepipe.transform(data.dtconclusao, 'dd-MMM-YYYY HH:mm:ss');
        // console.log(formattedDate)

      

      })

    } else {
      alert("algo deu errado")
    }




  }

  registerContract() {

    if (this.event === 'Cadastrar') {
      this.contractService.registerContract({
        idcliente: this.contrato.idcliente!,
        descricaovenda: this.contrato.descricaovenda,
        statusvenda: this.contrato.statusvenda,
        idprojeto: this.contrato.idprojeto,
        comercialvenda: this.contrato.comercialvenda,
        dtcontato: this.contrato.dtcontato,
        dtcontrato: this.contrato.dtcontrato,
        dtassinatura: this.contrato.dtassinatura,
        dtconclusao: this.contrato.dtconclusao,
        dtcriacao: this.contrato.dtcriacao,
        dtalteracao: this.contrato.dtalteracao,
        usuariocriacao: this.contrato.usuariocriacao,
        usuarioalteracao: this.contrato.usuarioalteracao
      }).subscribe((data) => { this.router.navigate([`/user/client360/${this.contrato.idcliente}`]) })
    } else if (this.event === 'Editar') {
      //alteração nas datas para realizar edição - ainda tem que formatar data
      this.contrato.dtalteracao= '2025-05-25',
      this.contractService.editContract(this.contrato).subscribe(()=>{
        this.router.navigate([`/user/contrato/${this.contrato.idvenda}`]) 
      })
    } else {
      alert('algo deu errado')
    }
  }

}
