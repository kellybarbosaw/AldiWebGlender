import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.scss'
})
export class ContratoComponent {


  contrato = {
    idvenda: 0,
    idcliente: 0,
    descricaovenda: '',
    statusvenda: '',
    idprojeto: 0,
    comercialvenda: '',

    dtcontato: '',
    dtcontrato: '',
    dtassinatura: '',
    dtconclusao: '',
    dtalteracao: '',

    usuariocriacao: '',
    usuarioalteracao: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, private contractService: ContractService) {


    this.contrato.idcliente = this.route.snapshot.params['id'];

    this.contractService.contractCurrent(this.route.snapshot.params['id'])
      .subscribe((datas) => {
        const data = datas[0];
        console.log(data);
        this.contrato.idvenda = data.idvenda!;
        this.contrato.idcliente = data.idcliente;
        this.contrato.descricaovenda = data.descricaovenda;
        this.contrato.statusvenda = data.statusvenda;
        this.contrato.idprojeto = data.idprojeto!;
        this.contrato.comercialvenda = data.comercialvenda;

        this.contrato.dtcontato = data.dtcontato;
        this.contrato.dtcontrato = data.dtcontrato;
        this.contrato.dtassinatura = data.dtassinatura;
        this.contrato.dtconclusao = data.dtconclusao;
        this.contrato.dtalteracao = data.dtalteracao;

        this.contrato.usuariocriacao = data.usuariocriacao;
        this.contrato.usuarioalteracao = data.usuarioalteracao;

      });
  }


  verProjeto(id: number) {
    this.router.navigate([`/user/projeto/${id}`]);
  }

  editContract() {
    this.router.navigate([`/user/clientes/vendas/${'edit'}/${this.contrato.idvenda}`]);
  }

  deleteContract(){
    alert("deseja realmente deletar?")
    this.contractService.deleteContract(this.contrato.idvenda.toString())
    .subscribe(()=>{this.router.navigate([`/user/client360/${this.contrato.idcliente}`])})
  }

}
