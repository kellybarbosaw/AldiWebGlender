import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { FormatsService } from '../../services/formats.service';
import { CommonModule } from '@angular/common';
import { catchError, of, Subject } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
//import 'jquery-mask-plugin/dist/jquery.mask.min.js';



@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, HttpClientModule,RouterOutlet,CommonModule],
  providers: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})

export class ClientComponent {
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

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
    tipocliente: ''
  }

  dadosFicticios = {
    tipocliente: 'P'
  }
  event = 'Cadastrar';

  constructor(
    private formatService: FormatsService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.client.idcliente = this.route.snapshot.params['id']
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.clientService
        .clientCurrent(this.route.snapshot.params['id'])
        .pipe(
          catchError(err => {
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        )
        .subscribe((datas) => {
          const data = datas[0];
          this.client.idcliente = data.IDCLIENTE!;
          this.client.nomefantasia = data.NOMEFANTASIA;
          this.client.nome = data.NOME;
          this.client.cgccfo = data.CGCCFO;
          this.client.inscrestadual = data.INSCRESTADUAL;
          this.client.pagrec = data.PAGREC;
          this.client.rua = data.RUA;
          this.client.numero = data.NUMERO;
          this.client.complemento = data.COMPLEMENTO;
          this.client.bairro = data.BAIRRO;
          this.client.cidade = data.CIDADE;
          this.client.codetd = data.CODETD;
          this.client.cep = data.CEP;
          this.client.telefone = data.TELEFONE;
          this.client.ruapgto = data.RUAPGTO;
          this.client.numeropgto = data.NUMEROPGTO;
          this.client.complementopgto = data.COMPLEMENTOPGTO;
          this.client.bairropgto = data.BAIRROPGTO;
          this.client.cidadepgto = data.CIDADEPGTO;
          this.client.codetdpgto = data.CODETDPGTO;
          this.client.ceppgto = data.CEPPGTO;
          this.client.telefonepgto = data.TELEFONEPAGTO;
          this.client.ruaentrega = data.RUAENTREGA;
          this.client.numeroentrega = data.NUMEROENTREGA;
          this.client.complementoentrega = data.COMPLEMENTOENTREGA;
          this.client.bairroentrega = data.BAIRROENTREGA;
          this.client.cidadeentrega = data.CIDADEENTREGA;
          this.client.codetdentrega = data.CODETDENTREGA;
          this.client.cepentrega = data.CEPENTREGA;
          this.client.telefoneentrega = data.TELEFONEENTREGA;
          this.client.email = data.EMAIL;
          this.client.ativo = data.ATIVO;
          this.client.inscrmunicipal = data.INSCRMUNICIPAL;
          this.client.pessoafisoujur = data.PESSOAFISOUJUR;
          this.client.pais = data.PAIS;
          this.client.paispgto = data.PAISPGTO;
          this.client.paisentrega = data.PAISENTREGA;
          this.client.emailentrega = data.EMAILENTREGA;
          this.client.emailpgto = data.EMAILPGTO;
          this.client.codmunicipiopgto = data.CODMUNICIPIOPGTO;
          this.client.codmunicipioentrega = data.CODMUNICIPIOENTREGA;
          this.client.dtcriacao = this.formatService.format(data.DTCRIACAO!, null, "dateTime");
          this.client.dtmodificacao = this.formatService.format(data.DTMODIFICACAO!, null, "dateTime");
          this.client.usuariocriacao = data.USUARIOCRIACAO;
          this.client.usuarioalteracao = data.USUARIOALTERACAO;
          this.client.tipocliente = data.TIPOCLIENTE;
        })
      this.event = "Editar"
    }

    setTimeout(() => {
      if (typeof document !== 'undefined') {
        // alert("teste NG ONinit")
        this.formatService.ativo(this.client.ativo)
      }
    }, 100);
  }
  registerClient(form: NgForm) {

    //VALIDAÇÃO DE CAMPOS PREENCHIDOS

    if (!this.client.cgccfo || !this.client.nome || !this.client.nomefantasia ||
      !this.client.inscrestadual || !this.client.inscrmunicipal || !this.client.telefone ||
      !this.client.email || !this.client.rua || !this.client.numero ||
      !this.client.complemento || !this.client.bairro || !this.client.cep ||
      !this.client.pagrec || !this.client.cidade || !this.client.codetd ||
      !this.client.cep || !this.client.email || !this.client.pais
      ) {
        alert('preencha os campos');
        console.log(this.client);
        this.camposPreenchidos = (
          form.controls['pessoafisoujur'].valid && 
          //form.controls['cgccfo'].valid && 
          form.controls['nome'].valid &&
          form.controls['nomefantasia'].valid &&
          form.controls['inscrestadual'].valid &&
          form.controls['inscrmunicipal'].valid &&
          form.controls['pagrec'].valid &&
          form.controls['rua'].valid &&
          form.controls['numero'].valid &&
          form.controls['complemento'].valid &&
          form.controls['bairro'].valid &&
          form.controls['cidade'].valid &&
          form.controls['codetd'].valid &&
          form.controls['cep'].valid &&
          form.controls['pais'].valid &&
          form.controls['email'].valid &&
          form.controls['telefone'].valid
          // form.controls['ruaentrega'].valid &&
          // form.controls['numeroentrega'].valid &&
          // form.controls['complementoentrega'].valid &&
          // form.controls['bairroentrega'].valid &&
          // form.controls['cidadeentrega'].valid &&
          // form.controls['codetdentrega'].valid &&
          // form.controls['cepentrega'].valid &&
          // form.controls['telefoneentrega'].valid &&
          // form.controls['codmunicipioentrega'].valid &&
          // form.controls['paisentrega'].valid &&
          // form.controls['emailentrega'].valid &&
          // form.controls['ruapgto'].valid &&
          // form.controls['numeropgto'].valid &&
          // form.controls['complementopgto'].valid &&
          // form.controls['bairropgto'].valid &&
          // form.controls['cidadepgto'].valid &&
          // form.controls['codetdpgto'].valid &&
          // form.controls['ceppgto'].valid &&
          // form.controls['telefonepgto'].valid &&
          // form.controls['codmunicipiopgto'].valid &&
          // form.controls['paispgto'].valid &&
          // form.controls['emailpgto'].valid 
          
          );
          this.botaoClicado = true;
        return;
      } 
      else {
        alert('Formulário enviado!');
        console.log(this.client);
      }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {

      this.client.dtcriacao = this.formatService.dateNow();
      this.client.dtmodificacao = this.formatService.dateNow();
      this.client.usuariocriacao = localStorage.getItem('user')!;
      this.client.usuarioalteracao = localStorage.getItem('user')!;
      this.client.tipocliente = this.dadosFicticios.tipocliente;

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
      })
        .pipe(
          catchError(err => {
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        )
        .subscribe((data) => { this.router.navigate(['/user/clients']) })

    } else if (this.event === "Editar") {
      this.client.dtmodificacao = this.formatService.dateNow();
      this.client.usuarioalteracao = localStorage.getItem('user')!;

      this.clientService.editClient(this.client)
        .pipe(
          catchError(err => {
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        )
        .subscribe(() => {
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
