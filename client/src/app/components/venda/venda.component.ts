import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContractService } from '../../services/contract.service';
import { FormatsService } from '../../services/formats.service';
// import { DatePipe } from '@angular/common';
import { CommonModule } from "@angular/common";
import { ClientService } from '../../services/client.service';
import { catchError, of, Subject, Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Console } from 'console';
import { MensageriaService } from '../../services/mensageria.service';




@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})
export class VendaComponent {
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  contrato = {
    idvenda: 0,
    idcliente: 0,
    descricaovenda: '',
    statusvenda: 'A',
    idprojeto: 0,
    comercialvendacol: '',

    dtcontato: '',
    dtcontrato: '',
    dtassinatura: '',
    dtconclusao: '',

    dtcriacao: '',
    dtalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
  }
  client = {
    idcliente: 0,
    nome: ''
  }
  event = 'Cadastrar';

  constructor(
    private formatService: FormatsService,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private loginService: LoginService,
    private messageriaService: MensageriaService) {

    if (this.route.snapshot.params['event'] === 'new') {
      this.event = 'Cadastrar'
      this.contrato.idcliente = this.route.snapshot.params['id'];
      this.clientContractCurrent();
    } else if (this.route.snapshot.params['event'] === 'edit') {
      this.event = 'Editar'
      this.contrato.idvenda = this.route.snapshot.params['id'];

      this.contractService.contractCurrent(this.contrato.idvenda)
        .pipe(
          catchError(err => {
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        ).subscribe((contratos) => {
          const contratoData = contratos[0];
          this.contrato.idvenda = contratoData.IDVENDA!;
          this.contrato.idcliente = contratoData.IDCLIENTE;
          this.contrato.descricaovenda = contratoData.DESCRICAOVENDA;
          this.contrato.statusvenda = contratoData.STATUSVENDA;
          this.contrato.idprojeto = contratoData.IDPROJETO!;
          this.contrato.comercialvendacol = contratoData.COMERCIALVENDAcol;

          this.contrato.dtcontato = this.formatService.format(contratoData.DTCONTATO, "dtcontato", "date");
          this.contrato.dtcontrato = this.formatService.format(contratoData.DTCONTRATO, "dtcontrato", "date");
          this.contrato.dtassinatura = this.formatService.format(contratoData.DTASSINATURA, "dtassinatura", "date");
          this.contrato.dtconclusao = this.formatService.format(contratoData.DTCONCLUSAO, "dtconclusao", "date");

          this.contrato.dtalteracao = this.formatService.format(contratoData.DATAALTERACAO, null, "dateTime");
          this.contrato.dtcriacao = this.formatService.format(contratoData.DATACRIACAO, null, "dateTime");
          this.contrato.usuariocriacao = contratoData.USUARIOCRIACAO;
          this.contrato.usuarioalteracao = contratoData.USUARIOALTERACAO;

          this.clientContractCurrent();

        })

    } else {
      alert("algo deu errado")
    }
  }

  ngOnInit() { }

  clientContractCurrent() {
    this.clientService.clientCurrent(this.contrato.idcliente.toString())
      .pipe(
        catchError(err => {
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      ).subscribe((datas) => {
        this.client.idcliente = datas[0].IDCLIENTE!;
        this.client.nome = datas[0].NOME;
      })
  }

  registerContract(form: NgForm) {

    if (!this.contrato.descricaovenda || !this.contrato.dtcontato || !this.contrato.comercialvendacol) {
      alert('preencha os campos');
      this.camposPreenchidos = (
        form.controls['descricaovenda'].valid &&
        form.controls['comercialvendacol'].valid &&
        form.controls['dtcontato'].valid
      );
      this.botaoClicado = true;
      return;
    }

    if (this.event === 'Cadastrar') {
      this.contrato.dtcriacao = this.formatService.dateNow(),
        this.contrato.dtalteracao = this.formatService.dateNow(),
        this.contrato.usuariocriacao = localStorage.getItem('user')!,
        this.contrato.usuarioalteracao = localStorage.getItem('user')!,

        this.contractService.registerContract({
          idcliente: this.contrato.idcliente!,
          descricaovenda: this.contrato.descricaovenda,
          statusvenda: this.contrato.statusvenda,
          idprojeto: this.contrato.idprojeto,
          comercialvendacol: this.contrato.comercialvendacol,
          dtcontato: this.contrato.dtcontato,
          dtcontrato: this.contrato.dtcontrato,
          dtassinatura: this.contrato.dtassinatura,
          dtconclusao: this.contrato.dtconclusao,
          dtcriacao: this.contrato.dtcriacao,
          dtalteracao: this.contrato.dtalteracao,
          usuariocriacao: this.contrato.usuariocriacao,
          usuarioalteracao: this.contrato.usuarioalteracao
        }).pipe(
          catchError(err => {
            this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
            // alert(err.error.message)
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        ).subscribe(() => {
          this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
          this.router.navigate([`/user/client360/${this.contrato.idcliente}`])
        })
    } else if (this.event === 'Editar') {

      this.contrato.dtalteracao = this.formatService.dateNow(),
        this.contrato.usuarioalteracao = localStorage.getItem('user')!,

        this.contractService.editContract(this.contrato)
          .pipe(
            catchError(err => {
              this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
              alert(err.error.message)
              this.error$.next(true)
              if (err.statusText === "Unauthorized") {
                alert("Seu iToken foi expirado! Realize o login novamente")
                this.loginService.deslogar();
              }
              return of();
            })
          ).subscribe(() => {
            this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
            this.router.navigate([`/user/contrato/${this.contrato.idvenda}`])
          })

    } else {
      alert('algo deu errado')
    }
  }

  voltar() {
    this.router.navigate([`/user/client360/${this.contrato.idcliente}`])
  }

}


