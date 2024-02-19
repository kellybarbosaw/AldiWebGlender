import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { ContractService } from '../../services/contract.service';
import { FormatsService } from '../../services/formats.service';

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
  projectClient$ = new Observable<Project[]>();


  constructor(private formatService : FormatsService,private router: Router, private route: ActivatedRoute, private contractService: ContractService) {


    this.contrato.idcliente = this.route.snapshot.params['id'];
    this.projectClient$ = this.contractService.projectsClient(this.route.snapshot.params['id'])


    this.contractService.contractCurrent(this.route.snapshot.params['id'])
      .subscribe((datas) => {
        const data = datas[0];
        console.log(data);
        this.contrato.idvenda = data.IDVENDA!;
        this.contrato.idcliente = data.IDCLIENTE;
        this.contrato.descricaovenda = data.DESCRICAOVENDA;
        this.contrato.statusvenda = data.STATUSVENDA;
        this.contrato.idprojeto = data.IDPROJETO!;
        this.contrato.comercialvenda = data.COMERCIALVENDAcol;

        this.contrato.dtcontato = data.DTCONTATO;
        this.contrato.dtcontrato = data.DTCONTRATO;
        this.contrato.dtassinatura = this.formatService.format(data.DTASSINATURA!, "dtassinatura","date");
        this.contrato.dtconclusao = this.formatService.format(data.DTCONCLUSAO!, "dtconclusao","date");
        this.contrato.dtalteracao = data.DATAALTERACAO;

        this.contrato.usuariocriacao = data.USUARIOCRIACAO;
        this.contrato.usuarioalteracao = data.USUARIOALTERACAO;

      });
  }


  verProjeto(id: number) {
    // this.router.navigate([`/user/contract/projeto/${id}`]);
  }

  editContract() {
    this.router.navigate([`/user/clientes/vendas/${'edit'}/${this.contrato.idvenda}`]);
  }

  deleteContract(){
    alert("deseja realmente deletar?")
    this.contractService.deleteContract(this.contrato.idvenda)
    .subscribe(()=>{this.router.navigate([`/user/client360/${this.contrato.idcliente}`])})
  }

  viewProject(id: number) {
    this.router.navigate([`/user/contract/projeto/${id}`]);
  }

  newProject(id: number) {
    this.router.navigate([`/user/projeto/${'new'}/${id}`]);
  }

}
