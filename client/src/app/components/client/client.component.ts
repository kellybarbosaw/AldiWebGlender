import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  client = {
    idclient: '',
    cnpj: '',
    nome: '',
    nomefantasia: '',
    inscrestadual: '',
    inscrmunicipal: '',
    telefone: '',
    celular: '',
    email: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
    respcomercial: '',
    telcomercial: '',
    celcomercial: '',
    emailcomercial: '',
    respfinanceiro: '',
    telfinanceiro: '',
    celfinanceiro: '',
    emailfinanceiro: ''
  }
  event = 'Cadastrar';


  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) {

    this.client.idclient = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.clientService.clientCurrent(this.route.snapshot.params['id'])
        .subscribe((datas) => {
          const data = datas[0];

          this.client.cnpj = data.cnpj,
            this.client.nome = data.nome,
            this.client.nomefantasia = data.nomefantasia,
            this.client.inscrestadual = data.inscrestadual,
            this.client.inscrmunicipal = data.inscrmunicipal,
            this.client.telefone = data.telefone,
            this.client.celular = data.celular!,
            this.client.email = data.email,
            this.client.rua = data.rua,
            this.client.numero = data.numero,
            this.client.complemento = data.complemento!,
            this.client.bairro = data.bairro,
            this.client.cidade = data.cidade,
            this.client.estado = data.estado,
            this.client.pais = data.pais,
            this.client.cep = data.cep,
            this.client.respcomercial = data.respcomercial,
            this.client.telcomercial = data.telcomercial,
            this.client.celcomercial = data.celcomercial!,
            this.client.emailcomercial = data.emailcomercial,
            this.client.respfinanceiro = data.respfinanceiro,
            this.client.telfinanceiro = data.telfinanceiro,
            this.client.celfinanceiro = data.celfinanceiro!,
            this.client.emailfinanceiro = data.emailfinanceiro
        })

      // console.log(this.client)
      this.event = "Editar"
    }
  }

  registerClient() {

    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (!this.client.cnpj || !this.client.nome || !this.client.nomefantasia ||
      !this.client.inscrestadual || !this.client.inscrmunicipal || !this.client.telefone ||
      !this.client.email || !this.client.rua || !this.client.numero ||
      !this.client.complemento || !this.client.bairro || !this.client.cep ||
      !this.client.respcomercial || !this.client.telcomercial || !this.client.emailcomercial ||
      !this.client.respfinanceiro || !this.client.telfinanceiro || !this.client.emailfinanceiro) {
      alert("preencha os campos");
      return;
    }


    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {

      this.clientService.registerClient({
        cnpj: this.client.cnpj,
        nome: this.client.nome,
        nomefantasia: this.client.nomefantasia,
        inscrestadual: this.client.inscrestadual,
        inscrmunicipal: this.client.inscrmunicipal,
        telefone: this.client.telefone,
        celular: this.client.celular,
        email: this.client.email,
        rua: this.client.rua,
        numero: this.client.numero,
        complemento: this.client.complemento,
        bairro: this.client.bairro,
        cidade: this.client.cidade,
        estado: this.client.estado,
        pais: this.client.pais,
        cep: this.client.cep,
        respcomercial: this.client.respcomercial,
        telcomercial: this.client.telcomercial,
        celcomercial: this.client.celcomercial,
        emailcomercial: this.client.emailcomercial,
        respfinanceiro: this.client.respfinanceiro,
        telfinanceiro: this.client.telfinanceiro,
        celfinanceiro: this.client.celfinanceiro,
        emailfinanceiro: this.client.emailfinanceiro
      }).subscribe((data) => {this.router.navigate(['/user/clients']) })
    } else if (this.event === "Editar") {
      console.log("editando")

      this.clientService.editClient({
        idclient: this.client.idclient,
        cnpj: this.client.cnpj,
        nome: this.client.nome,
        nomefantasia: this.client.nomefantasia,
        inscrestadual: this.client.inscrestadual,
        inscrmunicipal: this.client.inscrmunicipal,
        telefone: this.client.telefone,
        celular: this.client.celular,
        email: this.client.email,
        rua: this.client.rua,
        numero: this.client.numero,
        complemento: this.client.complemento,
        bairro: this.client.bairro,
        cidade: this.client.cidade,
        estado: this.client.estado,
        pais: this.client.pais,
        cep: this.client.cep,
        respcomercial: this.client.respcomercial,
        telcomercial: this.client.telcomercial,
        celcomercial: this.client.celcomercial,
        emailcomercial: this.client.emailcomercial,
        respfinanceiro: this.client.respfinanceiro,
        telfinanceiro: this.client.telfinanceiro,
        celfinanceiro: this.client.celfinanceiro,
        emailfinanceiro: this.client.emailfinanceiro
      }).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/user/clients']) })

    } else {
      alert("Error!")
    }



  }










  stage = 1;
  mudarEtapa(stage: number) {

    this.stage = stage;
    let element1 = document.querySelector('.stage_1') as HTMLLIElement
    let element2 = document.querySelector('.stage_2') as HTMLLIElement
    let element3 = document.querySelector('.stage_3') as HTMLLIElement

    switch (stage) {
      case 1:
        element1.classList.add("current")
        element2.classList.remove("current")
        element3.classList.remove("current")

        break;
      case 2:
        element1.classList.remove("current")
        element2.classList.add("current")
        element3.classList.remove("current")
        break;
      case 3:
        element1.classList.remove("current")
        element2.classList.remove("current")
        element3.classList.add("current")
        break;

      default:
        break;
    }

  }

}
