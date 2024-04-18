import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { Contract } from '../../../models/contract.model';
import { Project } from '../../../models/project.model';
import { Client360Service } from '../../../services/client360.service';
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
    idcliente: 0,
    nomefantasia: '',
    nome: '',
    cgccfo: '',

    telefone: '',
    email: '',

    emailpgto: '',
    telefonepgto: ''

  };

  contractClient$ = new Observable<Contract[]>();
  projectClient$ = new Observable<Project[]>();


  project = {};


  constructor(private client360Service: Client360Service, private router: Router, private route: ActivatedRoute) {
    this.client.idcliente = this.route.snapshot.params['id']
    this.contractClient$ = this.client360Service.contractsClient(this.route.snapshot.params['id']);
    this.projectClient$ = this.client360Service.projectsClient(this.route.snapshot.params['id'])

    

    if (this.route.snapshot.params['id'] === undefined) {
      alert("sem cliente")
    } else {
      this.client360Service.clientCurrent(this.route.snapshot.params['id'])
        .subscribe((datas) => {
          const data = datas[0];
            this.client.idcliente = data.IDCLIENTE!,
            this.client.cgccfo = data.CGCCFO,
            this.client.nome = data.NOME,
            this.client.nomefantasia = data.NOMEFANTASIA,

            this.client.telefone = data.TELEFONE,
            this.client.email = data.EMAIL,
            this.client.telefonepgto = data.TELEFONEPAGTO!,
            this.client.emailpgto = data.EMAILPGTO
        });
    }
  }


newContract(id: number) {

  this.router.navigate([`/user/clientes/vendas/${'new'}/${id}`]);

}
editContract(id: number) {

  this.router.navigate([`/user/clientes/venda/${id}`]);

}
viewContract(id: number) {

  this.router.navigate([`/user/contrato/${id}`]);

}
viewProject(id: number) {

  this.router.navigate([`/user/contract/projeto/${id}`]);

}
}
