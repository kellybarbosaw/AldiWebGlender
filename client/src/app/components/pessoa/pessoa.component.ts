import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormatsService } from '../../services/formats.service';
import { catchError, of, Subject, Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { CepService } from '../../services/cep.service';
import { Pais } from '../../models/cep/pais.model';
import { Estado } from '../../models/cep/estado.model';
import { Cidade } from '../../models/cep/cidade.model';
import { User } from '../../models/users.model';
import { OrgaoEmissor } from '../../models/cep/orgaoEmissor.model';
import { NgxMaskDirective } from 'ngx-mask';
import { MensageriaService } from '../../services/mensageria.service';



@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, CommonModule, NgxMaskDirective],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.scss',
})
export class PessoaComponent {
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  pessoa = {
    idpessoa: 0,
    nome: '',
    cpf: '',
    dtnascimento: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    naturalidade: '',
    nacionalidade: '',
    usuario: '',
    nroidentidade: '',
    orgaoemissorident: '',
    estadoemissorident: '',
    zusuario_usuario: '',
    dtcriacao: '',
    dtalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: ''
  };

  paises$ = new Observable<Pais[]>();
  estado$ = new Observable<Estado[]>();
  cidade$ = new Observable<Cidade[]>();
  orgaoEmissor$ = new Observable<OrgaoEmissor[]>();
  zusuarios$ = new Observable<User[]>();

  event = 'Cadastrar';

  constructor(
    private formatService: FormatsService,
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cep: CepService,
    private messageriaService: MensageriaService
  ) {
    this.pessoa.idpessoa = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.paises$ = this.cep.burcaCep('pais', null);
    this.orgaoEmissor$ = this.cep.buscarOrgaoEmissor();
    this.zusuarios$ = this.pessoaService.usuariosPessoa();

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.pessoaService
        .pessoaCurrent(this.route.snapshot.params['id'])
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
        .subscribe((datas: any) => {
          const data = datas[0];
          (this.pessoa.nome = data.NOME);
          (this.pessoa.cpf = data.CPF);
          (this.pessoa.dtnascimento = data.DTNASCIMENTO);
          (this.pessoa.rua = data.RUA);
          (this.pessoa.numero = data.NUMERO);
          (this.pessoa.complemento = data.COMPLEMENTO);
          (this.pessoa.bairro = data.BAIRRO);
          (this.pessoa.naturalidade = data.NATURALIDADE);
          (this.pessoa.nacionalidade = data.NACIONALIDADE);
          (this.pessoa.usuario = data.USUARIO);
          (this.pessoa.nroidentidade = data.NROIDENTIDADE);
          (this.pessoa.orgaoemissorident = data.ORGAOEMISSORIDENT);
          (this.pessoa.estadoemissorident = data.ESTADOEMISSORIDENT);
          (this.pessoa.zusuario_usuario = data.ZUSUARIO_USUARIO);
          this.pessoa.dtcriacao = this.formatService.format(data.DTCRIACAO!, null, "dateTime");
          this.pessoa.dtalteracao = this.formatService.format(data.DTMODIFICACAO!, null, "dateTime");
          this.pessoa.usuariocriacao = data.USUARIOCRIACAO;
          this.pessoa.usuarioalteracao = data.USUARIOALTERACAO;
          this.pessoa.dtnascimento = this.formatService.formatDate(data.DTNASCIMENTO!);

          this.estado$ = this.cep.burcaCep('estado', this.pessoa.nacionalidade);
          this.cidade$ = this.cep.burcaCep('cidade', this.pessoa.estadoemissorident);
        });
      this.event = 'Editar';
    }
  }
  registerPessoa(form: NgForm) {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.pessoa.nome ||
      !this.pessoa.cpf ||
      !this.pessoa.dtnascimento ||
      !this.pessoa.rua ||
      !this.pessoa.numero ||
      !this.pessoa.complemento ||
      !this.pessoa.bairro ||
      !this.pessoa.naturalidade ||
      !this.pessoa.nacionalidade ||
      !this.pessoa.nroidentidade ||
      !this.pessoa.orgaoemissorident ||
      !this.pessoa.estadoemissorident ||
      !this.pessoa.zusuario_usuario
    ) {
      alert('preencha os campos');
      this.camposPreenchidos = (
        form.controls['nome'].valid &&
        form.controls['cpf'].valid &&
        form.controls['dtnascimento'].valid &&
        form.controls['rua'].valid &&
        form.controls['numero'].valid &&
        form.controls['complemento'].valid &&
        form.controls['bairro'].valid &&
        form.controls['naturalidade'].valid &&
        form.controls['nacionalidade'].valid &&
        form.controls['nroidentidade'].valid &&
        form.controls['orgaoemissorident'].valid &&
        form.controls['estadoemissorident'].valid &&
        form.controls['zusuario_usuario'].valid

      );
      this.botaoClicado = true;
      return;
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {
      this.pessoa.dtcriacao = this.formatService.dateNow();
      this.pessoa.dtalteracao = this.formatService.dateNow();
      this.pessoa.usuariocriacao = localStorage.getItem('user')!;
      this.pessoa.usuarioalteracao = localStorage.getItem('user')!;

      this.pessoaService.registerPessoa({
          nome: this.pessoa.nome,
          cpf: this.pessoa.cpf,
          dtnascimento: this.pessoa.dtnascimento,
          rua: this.pessoa.rua,
          numero: this.pessoa.numero,
          complemento: this.pessoa.complemento,
          bairro: this.pessoa.bairro,
          naturalidade: this.pessoa.naturalidade,
          nacionalidade: this.pessoa.nacionalidade,
          usuario: this.pessoa.usuario,
          nroidentidade: this.pessoa.nroidentidade,
          orgaoemissorident: this.pessoa.orgaoemissorident,
          estadoemissorident: this.pessoa.estadoemissorident,
          zusuario_usuario: this.pessoa.zusuario_usuario,
          dtcriacao: this.pessoa.dtcriacao,
          dtalteracao: this.pessoa.dtalteracao,
          usuariocriacao: this.pessoa.usuariocriacao,
          usuarioalteracao: this.pessoa.usuarioalteracao,
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
          this.router.navigate(['/user/pessoas']);
        });
    } else if (this.event === 'Editar') {
      this.pessoa.dtalteracao = this.formatService.dateNow();
      this.pessoa.usuarioalteracao = localStorage.getItem('user')!;

      this.pessoaService.editPessoa(this.pessoa)
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
        ).subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
          this.router.navigate(['/user/pessoas']);
        });
    } else {
      alert('Error!');
    }
  }
  buscarCep(type: string, key: string,): void {
    if (key == '') return
    switch (type) {
      case 'estado':
        this.estado$ = this.cep.burcaCep(type, key);
        break
      case 'cidade':
        this.cidade$ = this.cep.burcaCep(type, key);
        break
      default:
        break;
    }
  }

  stage = 1;
  mudarEtapa(stage: number) {
    this.stage = stage;
    let element1 = document.querySelector('.stage_1') as HTMLLIElement;
    let element2 = document.querySelector('.stage_2') as HTMLLIElement;
    let element3 = document.querySelector('.stage_3') as HTMLLIElement;

    switch (stage) {
      case 1:
        element1.classList.add('current');
        element2.classList.remove('current');
        element3.classList.remove('current');

        break;
      case 2:
        element1.classList.remove('current');
        element2.classList.add('current');
        element3.classList.remove('current');
        break;
      case 3:
        element1.classList.remove('current');
        element2.classList.remove('current');
        element3.classList.add('current');
        break;

      default:
        break;
    }
  }
}