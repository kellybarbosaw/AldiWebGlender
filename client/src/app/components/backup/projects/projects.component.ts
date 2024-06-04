import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { ProjectService } from '../../../services/project.service';
import { FormatsService } from "../../../services/formats.service";
import { ClientService } from '../../../services/client.service';
import { Subject, catchError, of } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MensageriaService } from '../../../services/mensageria.service';
import { PesquisaClientesComponent } from "../../_pesquisas_seleção/pesquisa-clientes/pesquisa-clientes.component";
import { PesquisaContratosComponent } from "../../_pesquisas_seleção/pesquisa-contratos/pesquisa-contratos.component";




@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule, NgxMaskDirective, RouterLink, PesquisaClientesComponent, PesquisaContratosComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  datenow = '2024-01-16';
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;

  infoteste!: string;


  Project = {
      idprojeto: 0,
      titulo: '',
      descricao: '',
      idcliente: '',
      dtcriacao: '',
      dtalteracao: '',
      usuariocriacao: '',
      usuarioalteracao: '',
      statusprojeto: 1,
      idvenda: 0,
      dtinicioprojeto: '',
      dtconclusaoprojeto: '',
      horasestimadas: '',
      horasgastas: '',
      saldohoras: '',
      valorprojeto: null || 0,
      valorconsumido: null || 0
    }
    client = {
      idcliente: 0,
      nome: ''
    }
    contrato = {
      idvenda: 0,
      descricaovenda: ''
    }
    statusProjeto = {
      idstatus: 1,
      tituloStatus: ''
    }
  event = 'Cadastrar';

  busca_cliente_contrato = "cliente";
  nomeCli = 'cliente'
  nomeCon = 'contrato'


  constructor(
    private formatService: FormatsService,
    private projectService: ProjectService,
    private contractService: ContractService,
    private router: Router, 
    private route: ActivatedRoute,
    private clientService: ClientService,
    private loginService: LoginService,
    private messageriaService: MensageriaService
    ) {

    if (this.route.snapshot.params['event'] === 'new') {
      this.event = 'Cadastrar'
      this.Project.idvenda = this.route.snapshot.params['id'];
      console.log(this.Project.idvenda)
      console.log(this.route.snapshot.params['id'])
      // if (this.Project.idvenda  == 0) alert( 'novo cliente')
      this.contractService.contractCurrent(this.Project.idvenda)
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
      ).subscribe((data)=>{
        this.Project.idcliente = data[0].IDCLIENTE.toString()
        this.contrato.idvenda = data[0].IDVENDA!;
        this.contrato.descricaovenda = data[0].DESCRICAOVENDA!;
        this.clientContractCurrent()
        this.statusProjeto.tituloStatus = "EM ABERTO";
        
      });

    } else if (this.route.snapshot.params['event'] === 'edit') {
      this.event = 'Editar'
      this.Project.idprojeto = this.route.snapshot.params['id'];

      this.projectService.projectCurrent(this.Project.idprojeto!)
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
      ).subscribe((datas)=>{
        const data = datas[0];
        this.Project.idprojeto = data.IDPROJETO!,
        this.Project.titulo = data.TITULO,
        this.Project.descricao = data.DESCRICAO,
        this.Project.idcliente = data.IDCLIENTE,
        this.Project.dtcriacao = this.formatService.format(data.DTCRIACAO!,null,"date"),
        this.Project.dtalteracao = this.formatService.format(data.DTALTERACAO!,null,"date"),
        this.Project.usuariocriacao = data.USUARIOCRIACAO,
        this.Project.usuarioalteracao = data.USUARIOALTERACAO,
        this.Project.statusprojeto = data.STATUSPROJETO,
        this.Project.idvenda = data.IDVENDA!,
        this.Project.horasestimadas = data.HORASESTIMADAS!,
        this.Project.horasgastas = data.HORASGASTAS!,
        this.Project.saldohoras = data.SALDOHORAS!,
        this.Project.valorprojeto = data.VALORPROJETO!,
        this.Project.valorconsumido = data.VALORCONSUMIDO!

        this.Project.dtinicioprojeto = this.formatService.format(data.DTINCIOPROJETO!,"dtinicioprojeto","date")
        this.Project.dtconclusaoprojeto = this.formatService.format(data.DTCONCLUSAOPROJETO!,"dtconclusaoprojeto","date")

        this.contractService.contractCurrent(this.Project.idvenda).subscribe((data)=>{
          this.contrato.idvenda = data[0].IDVENDA!;
          this.contrato.descricaovenda = data[0].DESCRICAOVENDA!;
          this.clientContractCurrent()
          this.statusProjeto.tituloStatus = "EM ABERTO";
        })

      })
    }else{
      alert("algo errado")
    }
  }

  clientContractCurrent() {
    this.clientService.clientCurrent(this.Project.idcliente.toString())
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
      ).subscribe((datas) => {
        this.client.idcliente = datas[0].IDCLIENTE!;
        this.client.nome = datas[0].NOME;
      })
  }

  registerProject (form: NgForm) { 
    if (!this.Project.dtinicioprojeto || !this.Project.titulo || !this.Project.descricao || !this.Project.dtconclusaoprojeto 
    ) {
      alert('preencha os campos');
      this.camposPreenchidos = (
        form.controls['titulo'].valid &&
        form.controls['descricao'].valid &&
        form.controls['dtconclusaoprojeto'].valid &&
        form.controls['dtinicioprojeto'].valid 
      );
      this.botaoClicado = true;
      return;
    }

    if (this.event === 'Cadastrar') {

      this.Project.dtcriacao = this.formatService.dateNow(),
      this.Project.dtalteracao = this.formatService.dateNow(),
      this.Project.usuariocriacao = localStorage.getItem('user')!,
      this.Project.usuarioalteracao = localStorage.getItem('user')!,

      this.projectService.registerProject({
        titulo: this.Project.titulo,
        descricao: this.Project.descricao,
        idcliente: this.Project.idcliente,
        dtcriacao: this.Project.dtcriacao,
        dtalteracao: this.Project.dtalteracao,
        usuariocriacao: this.Project.usuariocriacao,
        usuarioalteracao: this.Project.usuarioalteracao,
        statusprojeto: this.Project.statusprojeto,
        idvenda: this.Project.idvenda,
        dtinicioprojeto: this.Project.dtinicioprojeto,
        dtconclusaoprojeto: this.Project.dtconclusaoprojeto,
        horasestimadas: this.Project.horasestimadas,
        horasgastas: this.Project.horasgastas,
        saldohoras: this.Project.saldohoras,
        valorprojeto: this.Project.valorprojeto,
        valorconsumido: this.Project.valorconsumido
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
        this.router.navigate([`/user/contrato/${this.Project.idvenda}`]) })
    } else if (this.event === 'Editar') {
      this.Project.dtalteracao = this.formatService.dateNow(),
      this.Project.usuarioalteracao = localStorage.getItem('user')!,

      this.projectService.editProject(this.Project).pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      ).subscribe(()=>{
        this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
        this.router.navigate([`/user/contract/projeto/${this.Project.idprojeto}`]) 
      })
    } else {
      alert('algo deu errado')
    }
  }

  recebeClienteEscolhido(event:{nome:string; idcliente:number}){
    this.client.nome = event.nome;
    this.client.idcliente = event.idcliente;
  }

  mudar(nome:string){
    if(nome === 'cliente') this.busca_cliente_contrato = nome
    if(nome === 'contrato') this.busca_cliente_contrato = nome
  }

}
