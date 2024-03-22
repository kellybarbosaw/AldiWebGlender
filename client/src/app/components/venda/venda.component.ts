import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContractService } from '../../services/contract.service';
import { FormatsService } from '../../services/formats.service';
// import { DatePipe } from '@angular/common';
import { CommonModule } from "@angular/common";
import { ClientService } from '../../services/client.service';
import { catchError, of, Subject, Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Console } from 'console';




@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink],
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})
export class VendaComponent {
  error$ = new Subject<boolean>();

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
    private loginService: LoginService) {


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
        ).subscribe((datas) => {
          const data = datas[0];
          this.contrato.idvenda = data.IDVENDA!;
          this.contrato.idcliente = data.IDCLIENTE;
          this.contrato.descricaovenda = data.DESCRICAOVENDA;
          this.contrato.statusvenda = data.STATUSVENDA;
          this.contrato.idprojeto = data.IDPROJETO!;
          this.contrato.comercialvendacol = data.COMERCIALVENDAcol;

          this.contrato.dtcontato = this.formatService.format(data.DTCONTATO, "dtcontato", "date");
          this.contrato.dtcontrato = this.formatService.format(data.DTCONTRATO, "dtcontrato", "date");
          this.contrato.dtassinatura = this.formatService.format(data.DTASSINATURA, "dtassinatura", "date");
          this.contrato.dtconclusao = this.formatService.format(data.DTCONCLUSAO, "dtconclusao", "date");

          this.contrato.dtalteracao = this.formatService.format(data.DATAALTERACAO, null, "dateTime");
          this.contrato.dtcriacao = this.formatService.format(data.DATACRIACAO, null, "dateTime");
          this.contrato.usuariocriacao = data.USUARIOCRIACAO;
          this.contrato.usuarioalteracao = data.USUARIOALTERACAO;

          this.clientContractCurrent();



          // const datepipe: DatePipe = new DatePipe('short') ;
          // let formattedDate = datepipe.transform(data.dtconclusao, 'dd-MMM-YYYY HH:mm:ss');
          // console.log(formattedDate)
        })

    } else {
      alert("algo deu errado")
    }
  }

  ngOnInit() {
  }

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
        const data = datas[0];
        this.client.idcliente = data.IDCLIENTE!;
        this.client.nome = data.NOME;
      })
  }

  registerContract() {

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
            alert(err.error.message)
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        ).subscribe((data) => { this.router.navigate([`/user/client360/${this.contrato.idcliente}`]) })
    } else if (this.event === 'Editar') {

      this.contrato.dtalteracao = this.formatService.dateNow(),
        this.contrato.usuarioalteracao = localStorage.getItem('user')!,

        console.log(this.contrato)
      this.contractService.editContract(this.contrato)
        .pipe(
          catchError(err => {
            alert(err.error.message)
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        ).subscribe(() => {
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


