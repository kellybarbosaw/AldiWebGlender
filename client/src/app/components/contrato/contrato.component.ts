import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { catchError, of, Subject, Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { ContractService } from '../../services/contract.service';
import { FormatsService } from '../../services/formats.service';
import { LoginService } from '../../services/login.service';
import { MensageriaService } from '../../services/mensageria.service';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.scss'
})
export class ContratoComponent {

  contratoExclude = 0;
  error$ = new Subject<boolean>();

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
    nomeCliente:''
  }
  projectClient$ = new Observable<Project[]>();


  constructor(
    private formatService: FormatsService,
    private router: Router, 
    private route: ActivatedRoute, 
    private contractService: ContractService,
    private loginService: LoginService,
    private messageriaService: MensageriaService) {

    this.contrato.idvenda = this.route.snapshot.params['id'];
    this.projectClient$ = this.contractService.projectsContract(this.route.snapshot.params['id'])

    this.contractService.contractCurrent(this.route.snapshot.params['id'])
    .pipe(
      catchError(err => {
        this.messageriaService.messagesRequest('Ocorreu um Erro',err.error.message,'messages','danger')
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
        this.contrato.nomeCliente = data.NOMECLIENTE;
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

  editContract() {
    this.router.navigate([`/user/clientes/vendas/${'edit'}/${this.contrato.idvenda}`]);
  }

  excludeContrato(id: number, event: string | null) {
    if (!event) this.contratoExclude = id;
    if (event === 'clear') this.contratoExclude = 0;
  }

  deleteContract(id: number){
    this.contractService.deleteContract(id)
    .pipe(
      catchError(err => {
        this.messageriaService.messagesRequest('Ocorreu um Erro',err.error.message,'messages','danger')
        return of();
      })
    ).subscribe(()=>{
      this.messageriaService.messagesRequest('Sucesso!', 'Contrato Excluído Com Sucesso!', 'messages', 'success')
      this.router.navigate([`/user/client360/${this.contrato.idcliente}`])})
  }

}
