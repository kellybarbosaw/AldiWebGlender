import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { FormatsService } from '../../services/formats.service';
import { CommonModule } from '@angular/common';
import { catchError, of, Subject, Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { CepService } from '../../services/cep.service';
import { Pais } from '../../models/cep/pais.model';
import { Estado } from '../../models/cep/estado.model';
import { Cidade } from '../../models/cep/cidade.model';
import { MensageriaService } from '../../services/mensageria.service';




@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterOutlet, CommonModule, NgxMaskDirective],
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
  dtnascimento = '';
  event = 'Cadastrar';

  //objetos para cep
  paises$ = new Observable<Pais[]>();
  estado$ = new Observable<Estado[]>();
  cidade$ = new Observable<Cidade[]>();

  paisesEntrega$ = new Observable<Pais[]>();
  estadoEntrega$ = new Observable<Estado[]>();
  cidadeEntrega$ = new Observable<Cidade[]>();

  paisesPgto$ = new Observable<Pais[]>();
  estadoPgto$ = new Observable<Estado[]>();
  cidadePgto$ = new Observable<Cidade[]>();

  constructor(
    private formatService: FormatsService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cep: CepService,
    private messageriaService: MensageriaService
  ) {
    this.client.idcliente = this.route.snapshot.params['id']
  }

  ngOnInit() {
    this.paises$ = this.cep.burcaCep('pais', null);
    this.paisesEntrega$ = this.paises$;
    this.paisesPgto$ = this.paises$;

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = "Cadastrar"

    } else {
      this.clientService
        .clientCurrent(this.route.snapshot.params['id'])
        .pipe(
          catchError(err => {
            this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
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

          if (this.client.pais) this.estado$ = this.cep.burcaCep('estado', this.client.pais);
          if (this.client.codetd) this.cidade$ = this.cep.burcaCep('cidade', this.client.codetd);

          if (this.client.paisentrega) this.estadoEntrega$ = this.cep.burcaCep('estado', this.client.paisentrega);
          if (this.client.codetdentrega) this.cidadeEntrega$ = this.cep.burcaCep('cidade', this.client.codetdentrega);

          if (this.client.paispgto) this.estadoPgto$ = this.cep.burcaCep('estado', this.client.paispgto);
          if (this.client.codetdpgto) this.cidadePgto$ = this.cep.burcaCep('cidade', this.client.codetdpgto);

        })
      this.event = "Editar"
    }

    setTimeout(() => {
      if (typeof document !== 'undefined') {
        // alert("teste NG ONinit")
        this.formatService.ativo(this.client.ativo);
      }
    }, 100);
  };

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
      this.camposPreenchidos = (
        form.controls['pessoafisoujur'].valid &&
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
      );
      this.botaoClicado = true;
      return;
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === "Cadastrar") {

      this.client.dtcriacao = this.formatService.dateNow();
      this.client.dtmodificacao = this.formatService.dateNow();
      this.client.usuariocriacao = localStorage.getItem('user')!;
      this.client.usuarioalteracao = localStorage.getItem('user')!;
      this.client.tipocliente = this.dadosFicticios.tipocliente;

      if (this.client.pessoafisoujur === 'F') {
        this.clientService.registerPessoaFisica(this.client, this.dtnascimento)
          .pipe(
            catchError(err => {
              this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
              this.error$.next(true)
              if (err.statusText === "Unauthorized") {
                alert("Seu iToken foi expirado! Realize o login novamente")
                this.loginService.deslogar();
              }
              return of();
            })
          ).subscribe((data) => { 
            this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
            this.router.navigate(['/user/clients']) 
          })

      } else {
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
          cep: this.client.cep.replace(/[^\d]+/g, ''),
          telefone: this.client.telefone.replace(/[^\d]+/g, '').substring(0, 11),
          ruapgto: this.client.ruapgto,
          numeropgto: this.client.numeropgto,
          complementopgto: this.client.complementopgto,
          bairropgto: this.client.bairropgto,
          cidadepgto: this.client.cidadepgto,
          codetdpgto: this.client.codetdpgto,
          ceppgto: this.client.ceppgto.replace(/[^\d]+/g, ''),
          telefonepgto: this.client.telefonepgto.replace(/[^\d]+/g, '').substring(0, 11),
          ruaentrega: this.client.ruaentrega,
          numeroentrega: this.client.numeroentrega,
          complementoentrega: this.client.complementoentrega,
          bairroentrega: this.client.bairroentrega,
          cidadeentrega: this.client.cidadeentrega,
          codetdentrega: this.client.codetdentrega,
          cepentrega: this.client.cepentrega.replace(/[^\d]+/g, ''),
          telefoneentrega: this.client.telefoneentrega.replace(/[^\d]+/g, '').substring(0, 11),
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
          
        }).pipe(
            catchError(err => {
              this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
              this.error$.next(true)
              if (err.statusText === "Unauthorized") {
                alert("Seu iToken foi expirado! Realize o login novamente")
                this.loginService.deslogar();
              }
              return of();
            })
          ).subscribe(() => {
            this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
           this.router.navigate(['/user/clients']) })
      }

    } else if (this.event === "Editar") {
      this.client.dtmodificacao = this.formatService.dateNow();
      this.client.usuarioalteracao = localStorage.getItem('user')!;
      this.clientService.editClient(this.client)
        .pipe(
          catchError(err => {
            this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        )
        .subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/clients'])
        })
    } else {
      alert("Error!")
    }
  };

  buscarCep(entidade: string, type: string, key: string,): void {
    if (key == '') return

    switch (type) {
      case 'estado':
        if (entidade === 'geral') {
          this.estado$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'entrega') {
          this.estadoEntrega$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'pgto') {
          this.estadoPgto$ = this.cep.burcaCep(type, key);
        }
        break;

      case 'cidade':
        if (entidade === 'geral') {
          this.cidade$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'entrega') {
          this.cidadeEntrega$ = this.cep.burcaCep(type, key);
        } else if (entidade === 'pgto') {
          this.cidadePgto$ = this.cep.burcaCep(type, key);
        }
        break;

      default:
        break;
    }

  };

  consultarCNPJ() {
    this.cep.buscarCnpj(this.client.cgccfo)
      .subscribe((data) => {
        this.popularCNPJ(data)
      }, error => {
        console.error(error),
          alert("cnpj invalido: '" + this.client.cgccfo + "'")
      });

  };

  popularCNPJ(result: any) {
    if (result.message == 'CNPJ inválido') {
      alert("cnpj invalido: '" + this.client.cgccfo + "'")
    } else {
      this.client.nomefantasia = result.fantasia.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.client.nome = result.nome.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.client.rua = result.logradouro.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.client.complemento = result.complemento.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.client.bairro = result.bairro.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.client.cidade = result.municipio.toLowerCase().replace(/(?:^|\s)\S/g, function(a: string) {
        return a.toUpperCase();
      });
      this.client.numero = result.numero;
      this.client.codetd = result.uf;
      this.client.cep = result.cep;
      this.client.telefone = result.telefone;
      this.client.email = result.email;
      this.client.ruapgto = this.client.rua;
      this.client.numeropgto = this.client.numero;
      this.client.complementopgto = this.client.complemento;
      this.client.bairropgto = this.client.bairro;
      this.client.cidadepgto = this.client.cidade;
      this.client.codetdpgto = this.client.codetd;
      this.client.ceppgto = this.client.cep;
      this.client.telefonepgto = this.client.telefone;
      this.client.paispgto = this.client.pais;
      this.client.emailpgto = this.client.email;
      this.client.codmunicipiopgto = this.client.cidade;
      this.client.ruaentrega = this.client.rua;
      this.client.numeroentrega = this.client.numero;
      this.client.complementoentrega = this.client.complemento;
      this.client.bairroentrega = this.client.bairro;
      this.client.cidadeentrega = this.client.cidade;
      this.client.codetdentrega = this.client.codetd;
      this.client.cepentrega = this.client.cep;
      this.client.telefoneentrega = this.client.telefone;
      this.client.paisentrega = this.client.pais;
      this.client.emailentrega = this.client.email;
      this.client.codmunicipioentrega = this.client.cidade;
      this.consultarCEP();
    }
  };

  consultarCEP() {
    this.cep.buscarCep(this.client.cep.replace(/[^\d]+/g, ''))
      .subscribe((data) => {
        this.popularCEP(data)
      },
        error => {
          alert("cep invalido: '" + this.client.cep + "'")
        });
  };

  popularCEP(result: any) {
    if (result.erro == 'true') {
      alert("CEP invalido: '" + this.client.cep + "'")
    } else {
      this.client.pais = 'BRA';
      this.client.paisentrega = 'BRA';
      this.client.paispgto = 'BRA';
      this.client.codetd = result.uf;
      this.client.codetdentrega = result.uf;
      this.client.codetdpgto = result.uf;
      this.estado$ = this.cep.burcaCep('estado', this.client.pais);
      this.estadoEntrega$ = this.estado$;
      this.estadoPgto$ = this.estadoEntrega$
      this.client.cidade = result.localidade
      this.client.cidadeentrega = result.localidade;
      this.client.cidadepgto = result.localidade;
      this.cidade$ = this.cep.burcaCep('cidade', this.client.codetd);
      this.cidadeEntrega$ = this.cidade$;
      this.cidadePgto$ = this.cidadeEntrega$;
      this.client.rua = result.logradouro;
      this.client.ruaentrega = result.logradouro;
      this.client.ruapgto = result.logradouro;
      this.client.complemento = result.complemento;
      this.client.complementoentrega = result.complemento;
      this.client.complementopgto = result.complemento;
      this.client.bairro = result.bairro;
      this.client.bairroentrega = result.bairro;
      this.client.bairropgto = result.bairro;
      this.client.codmunicipiopgto = result.localidade;
      this.client.codmunicipioentrega = result.localidade;
    }
  };

  consultarCEP2(cep: string, etapa: string) {
    this.cep.buscarCep(cep).subscribe((data) => {
      switch (etapa) {
        case 'geral':
          this.client.pais = 'BRA';
          this.estado$ = this.cep.burcaCep('estado', this.client.pais);
          this.client.codetd = data.uf;
          this.cidade$ = this.cep.burcaCep('cidade', this.client.codetd);
          this.client.cidade = data.localidade
          this.client.rua = data.logradouro;
          this.client.complemento = data.complemento;
          this.client.bairro = data.bairro;
          this.client.codmunicipioentrega = data.localidade;
          break;

        case 'entrega':
          this.client.paisentrega = 'BRA';
          this.estadoEntrega$ = this.cep.burcaCep('estado', this.client.paisentrega);
          this.client.codetdentrega = data.uf;
          this.cidadeEntrega$ = this.cep.burcaCep('cidade', this.client.codetdentrega);
          this.client.cidadeentrega = data.localidade
          this.client.ruaentrega = data.logradouro;
          this.client.complementoentrega = data.complemento;
          this.client.bairroentrega = data.bairro;
          this.client.codmunicipioentrega = data.localidade;
          break;

        case 'financeiro':
          this.client.paispgto = 'BRA',
          this.estadoPgto$ = this.cep.burcaCep('estado', this.client.paispgto);
          this.client.codetdpgto = data.uf;
          this.cidadePgto$ = this.cep.burcaCep('cidade', this.client.codetdpgto);
          this.client.cidadepgto = data.localidade;
          this.client.ruapgto = data.logradouro;
          this.client.complementopgto = data.complemento;
          this.client.bairropgto = data.bairro;
          this.client.codmunicipiopgto = data.localidade;
          
          break;

        default:
          break;
      }
    });
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
