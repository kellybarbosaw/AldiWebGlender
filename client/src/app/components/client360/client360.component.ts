import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { Contract } from '../../models/contract.model';
import { Client360Service } from '../../services/client360.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-client360',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client360.component.html',
  styleUrl: './client360.component.scss'
})
export class Client360Component {

  client = {
    idclient: '',
    cnpj: '',
    nome: '',
    nomefantasia: '',

    respcomercial: '',
    telcomercial: '',
    celcomercial: '',
    emailcomercial: '',

    respfinanceiro: '',
    telfinanceiro: '',
    celfinanceiro: '',
    emailfinanceiro: ''
  };

  contractClient$ = new Observable<Contract[]>();


  project = {};


  constructor(private client360Service: Client360Service, private router: Router, private route: ActivatedRoute) {
    this.client.idclient = this.route.snapshot.params['id']
    this.contractClient$ = this.client360Service.contractsClient(this.route.snapshot.params['id']);


    if (this.route.snapshot.params['id'] === undefined) {
      alert("sem cliente")
    } else {
      this.client360Service.clientCurrent(this.route.snapshot.params['id'])
        .subscribe((datas) => {
          const data = datas[0];
            this.client.idclient = data.idclient!,
            this.client.cnpj = data.cnpj,
            this.client.nome = data.nome,
            this.client.nomefantasia = data.nomefantasia,

            this.client.respcomercial = data.respcomercial,
            this.client.telcomercial = data.telcomercial,
            this.client.celcomercial = data.celcomercial!,
            this.client.emailcomercial = data.emailcomercial,

            this.client.respfinanceiro = data.respfinanceiro,
            this.client.telfinanceiro = data.telfinanceiro,
            this.client.celfinanceiro = data.celfinanceiro!,
            this.client.emailfinanceiro = data.emailfinanceiro
        });
    }




  }





newContract(id: string) {

  this.router.navigate([`/user/clientes/vendas/${'new'}/${id}`]);

}
editContract(id: number) {

  this.router.navigate([`/user/clientes/venda/${id}`]);

}
viewContract(id: number) {

  this.router.navigate([`/user/contrato/${id}`]);

}


}
