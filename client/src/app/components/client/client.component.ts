import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { FormatsService } from '../../services/formats.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  client = {
    idcliente: 0,
    nomefantasia: '',
    nome: '',
    cgccfo: '',
    inscrestadual: '',
    pagrec: 0,
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    codetd: '',
    cep: '',
    telefone: '',
    ruapgto: '',
    numeropgto: '',
    complementopgto: '',
    bairropgto: '',
    cidadepgto: '',
    codetdpgto: '',
    ceppgto: '',
    telefonepgto: '',
    ruaentrega: '',
    numeroentrega: '',
    complementoentrega: '',
    bairroentrega: '',
    cidadeentrega: '',
    codetdentrega: '',
    cepentrega: '',
    telefoneentrega: '',
    email: '',
    ativo: 2,
    inscrmunicipal: '',
    pessoafisoujur: '',
    pais: '',
    paispgto: '',
    paisentrega: '',
    emailentrega: '',
    emailpgto: '',
    codmunicipiopgto: '',
    codmunicipioentrega: '',
    dtcriacao: '',
    dtmodificacao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    tipocliente: '',
    teste: true
  }

  dadosFicticios = {
    dtcriacao: '2024-01-29 12:26:00',
    dtmodificacao: '2024-01-29 12:26:00',
    usuariocriacao: 'usuario teste criacao',
    usuarioalteracao: 'usuario teste alteracao',
    tipocliente: '1'
  }
  event = 'Cadastrar';

  constructor(private formatService: FormatsService,private clientService: ClientService, private router: Router, private route: ActivatedRoute) {

    this.client.idcliente = this.route.snapshot.params['id']

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.clientService.clientCurrent(this.route.snapshot.params['id'])
        .subscribe((datas) => {
          const data = datas[0];

          this.client.idcliente = data.IDCLIENTE!,
            this.client.nomefantasia = data.NOMEFANTASIA,
            this.client.nome = data.NOME,
            this.client.cgccfo = data.CGCCFO,
            this.client.inscrestadual = data.INSCRESTADUAL,
            this.client.pagrec = data.PAGREC,
            this.client.rua = data.RUA,
            this.client.numero = data.NUMERO,
            this.client.complemento = data.COMPLEMENTO,
            this.client.bairro = data.BAIRRO,
            this.client.cidade = data.CIDADE,
            this.client.codetd = data.CODETD,
            this.client.cep = data.CEP,
            this.client.telefone = data.TELEFONE,
            this.client.ruapgto = data.RUAPGTO,
            this.client.numeropgto = data.NUMEROPGTO,
            this.client.complementopgto = data.COMPLEMENTOPGTO,
            this.client.bairropgto = data.BAIRROPGTO,
            this.client.cidadepgto = data.CIDADEPGTO,
            this.client.codetdpgto = data.CODETDPGTO,
            this.client.ceppgto = data.CEPPGTO,
            this.client.telefonepgto = data.TELEFONEPAGTO,
            this.client.ruaentrega = data.RUAENTREGA,
            this.client.numeroentrega = data.NUMEROENTREGA,
            this.client.complementoentrega = data.COMPLEMENTOENTREGA,
            this.client.bairroentrega = data.BAIRROENTREGA,
            this.client.cidadeentrega = data.CIDADEENTREGA,
            this.client.codetdentrega = data.CODETDENTREGA,
            this.client.cepentrega = data.CEPENTREGA,
            this.client.telefoneentrega = data.TELEFONEENTREGA,
            this.client.email = data.EMAIL,
            this.client.ativo = data.ATIVO,
            this.client.inscrmunicipal = data.INSCRMUNICIPAL,
            this.client.pessoafisoujur = data.PESSOAFISOUJUR,
            this.client.pais = data.PAIS,
            this.client.paispgto = data.PAISPGTO,
            this.client.paisentrega = data.PAISENTREGA,
            this.client.emailentrega = data.EMAILENTREGA,
            this.client.emailpgto = data.EMAILPGTO,
            this.client.codmunicipiopgto = data.CODMUNICIPIOPGTO,
            this.client.codmunicipioentrega = data.CODMUNICIPIOENTREGA,
            this.client.dtcriacao = data.DTCRIACAO,
            this.client.dtmodificacao = data.DTMODIFICACAO,
            this.client.usuariocriacao = data.USUARIOCRIACAO,
            this.client.usuarioalteracao = data.USUARIOALTERACAO,
            this.client.tipocliente = data.TIPOCLIENTE
        })

      this.event = "Editar"

    }
  }

  ngOnInit() {
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        // alert("teste NG ONinit")
        this.formatService.ativo(this.client.ativo)
      }
    }, 100);
  }
  registerClient() {

    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (!this.client.cgccfo || !this.client.nome || !this.client.nomefantasia ||
      !this.client.inscrestadual || !this.client.inscrmunicipal || !this.client.telefone ||
      !this.client.email || !this.client.rua || !this.client.numero ||
      !this.client.complemento || !this.client.bairro || !this.client.cep ||
      !this.client.pagrec || !this.client.cidade || !this.client.codetd ||
      !this.client.cep || !this.client.email || !this.client.pais) {
      alert("preencha os campos");
      return;
    }


    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {

      this.client.dtcriacao = this.dadosFicticios.dtcriacao,
        this.client.dtmodificacao = this.dadosFicticios.dtmodificacao,
        this.client.usuariocriacao = this.dadosFicticios.usuariocriacao,
        this.client.usuarioalteracao = this.dadosFicticios.usuarioalteracao,
        this.client.tipocliente = this.dadosFicticios.tipocliente

      this.clientService.registerClient({
        nomefantasia: this.client.nomefantasia,
        nome: this.client.nome,
        cgccfo: this.client.cgccfo,
        inscrestadual: this.client.inscrestadual,
        pagrec: this.client.pagrec,
        rua: this.client.rua,
        numero: this.client.numero,
        complemento: this.client.complemento,
        bairro: this.client.bairro,
        cidade: this.client.cidade,
        codetd: this.client.codetd,
        cep: this.client.cep,
        telefone: this.client.telefone,
        ruapgto: this.client.ruapgto,
        numeropgto: this.client.numeropgto,
        complementopgto: this.client.complementopgto,
        bairropgto: this.client.bairropgto,
        cidadepgto: this.client.cidadepgto,
        codetdpgto: this.client.codetdpgto,
        ceppgto: this.client.ceppgto,
        telefonepgto: this.client.telefonepgto,
        ruaentrega: this.client.ruaentrega,
        numeroentrega: this.client.numeroentrega,
        complementoentrega: this.client.complementoentrega,
        bairroentrega: this.client.bairroentrega,
        cidadeentrega: this.client.cidadeentrega,
        codetdentrega: this.client.codetdentrega,
        cepentrega: this.client.cepentrega,
        telefoneentrega: this.client.telefoneentrega,
        email: this.client.email,
        ativo: this.client.ativo,
        inscrmunicipal: this.client.inscrmunicipal,
        pessoafisoujur: this.client.pessoafisoujur,
        pais: this.client.pais,
        paispgto: this.client.paispgto,
        paisentrega: this.client.paisentrega,
        emailentrega: this.client.emailentrega,
        emailpgto: this.client.emailpgto,
        codmunicipiopgto: this.client.codmunicipiopgto,
        codmunicipioentrega: this.client.codmunicipioentrega,
        dtcriacao: this.client.dtcriacao,
        dtmodificacao: this.client.dtmodificacao,
        usuariocriacao: this.client.usuariocriacao,
        usuarioalteracao: this.client.usuarioalteracao,
        tipocliente: this.client.tipocliente,
      }).subscribe((data) => { this.router.navigate(['/user/clients']) })
    } else if (this.event === "Editar") {

      this.client.dtcriacao = this.dadosFicticios.dtcriacao,
        this.client.dtmodificacao = this.dadosFicticios.dtmodificacao,

        this.clientService.editClient({
          idcliente: this.client.idcliente,
          nomefantasia: this.client.nomefantasia,
          nome: this.client.nome,
          cgccfo: this.client.cgccfo,
          inscrestadual: this.client.inscrestadual,
          pagrec: this.client.pagrec,
          rua: this.client.rua,
          numero: this.client.numero,
          complemento: this.client.complemento,
          bairro: this.client.bairro,
          cidade: this.client.cidade,
          codetd: this.client.codetd,
          cep: this.client.cep,
          telefone: this.client.telefone,
          ruapgto: this.client.ruapgto,
          numeropgto: this.client.numeropgto,
          complementopgto: this.client.complementopgto,
          bairropgto: this.client.bairropgto,
          cidadepgto: this.client.cidadepgto,
          codetdpgto: this.client.codetdpgto,
          ceppgto: this.client.ceppgto,
          telefonepgto: this.client.telefonepgto,
          ruaentrega: this.client.ruaentrega,
          numeroentrega: this.client.numeroentrega,
          complementoentrega: this.client.complementoentrega,
          bairroentrega: this.client.bairroentrega,
          cidadeentrega: this.client.cidadeentrega,
          codetdentrega: this.client.codetdentrega,
          cepentrega: this.client.cepentrega,
          telefoneentrega: this.client.telefoneentrega,
          email: this.client.email,
          ativo: this.client.ativo,
          inscrmunicipal: this.client.inscrmunicipal,
          pessoafisoujur: this.client.pessoafisoujur,
          pais: this.client.pais,
          paispgto: this.client.paispgto,
          paisentrega: this.client.paisentrega,
          emailentrega: this.client.emailentrega,
          emailpgto: this.client.emailpgto,
          codmunicipiopgto: this.client.codmunicipiopgto,
          codmunicipioentrega: this.client.codmunicipioentrega,
          dtcriacao: this.client.dtcriacao,
          dtmodificacao: this.client.dtmodificacao,
          usuariocriacao: this.client.usuariocriacao,
          usuarioalteracao: this.client.usuarioalteracao,
          tipocliente: this.client.tipocliente,
        }).subscribe(() => {
          this.router.navigate(['/user/clients'])
        })

    } else {
      alert("Error!")
    }
  }

  stage = 1;
  stageName = "GERAL";
  mudarEtapa(stage: number) {

    this.stage = stage;
    let element1 = document.querySelector('.stage_1') as HTMLLIElement
    let element2 = document.querySelector('.stage_2') as HTMLLIElement
    let element3 = document.querySelector('.stage_3') as HTMLLIElement
    let element4 = document.querySelector('.stage_4') as HTMLLIElement

    switch (stage) {
      case 1:
        element1.classList.add("current")
        element2.classList.remove("current")
        element3.classList.remove("current")
        element3.classList.remove("current")
        element4.classList.remove("current")
        this.stageName = "GERAL";
        break;
      case 2:
        element1.classList.remove("current")
        element2.classList.add("current")
        element3.classList.remove("current")
        element4.classList.remove("current")
        this.stageName = "ENDEREÇO";
        break;
      case 3:
        element1.classList.remove("current")
        element2.classList.remove("current")
        element3.classList.add("current")
        element4.classList.remove("current")
        this.stageName = "ENTREGA";
        break;
      case 4:
        element1.classList.remove("current")
        element2.classList.remove("current")
        element3.classList.remove("current")
        element4.classList.add("current")
        this.stageName = "FINANCEIRO";
        break;

      default:
        break;
    }

  }

}
