import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Optional, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { ProjectService } from '../../../services/project.service';
import { FormatsService } from "../../../services/formats.service";
import { ClientService } from '../../../services/client.service';
import { Observable, Subject, catchError, of } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MensageriaService } from '../../../services/mensageria.service';
import { ClientComponent } from '../../_Clientes/client/client.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VendaComponent } from '../../_Contratos/venda/venda.component';
import { Project } from '../../../models/project.model';
import { Contract } from '../../../models/contract.model';
import { TarefaComponent } from '../../_Tarefas/tarefa/tarefa.component';
import { ProjetoTarefaComponent } from '../../projeto-tarefa/projeto-tarefa.component';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule, NgxMaskDirective, RouterLink, MatDialogModule],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  datenow = '2024-01-16';
  error$ = new Subject<boolean>();
  camposPreenchidos: boolean = true;
  botaoClicado: boolean = false;
  client$ = new Observable<Project[]>();
  tarefas$ = new Observable<Project[]>();
  contrato$ = new Observable<Project[]>();
  contratosDoCliente$ = new Observable<Contract[]>();
  projetoTarefa$ = new Observable<Project[]>();

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
      nome: '',
      tarefas: '',
      contrato: '',
      titulotarefa: '',
      valorprojeto: null || 0,
      valorconsumido: null || 0
    }
    client = {
      idcliente: 0,
      nome: ''
    }
    tarefa = {
      titulotarefa: ''
    }
    projetoTarefa = {
      titulotarefa: ''
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
    private messageriaService: MensageriaService,
    public dialog: MatDialog
    ) {

      this.client$ = projectService.clientProject(this.Project.nome);
      this.tarefas$ = projectService.tarefaProject(this.Project.tarefas);
      this.contrato$ = projectService.contratoProject(this.Project.contrato);
      this.projetoTarefa$ = projectService.projetoTarefaProject(this.Project.titulotarefa);

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
        this.Project.dtcriacao = this.formatService.format(data.DTCRIACAO!, null, "dateTime"),
        this.Project.dtalteracao = this.formatService.format(data.DTALTERACAO!, null, "dateTime"),
        this.Project.usuariocriacao = data.USUARIOCRIACAO,
        this.Project.usuarioalteracao = data.USUARIOALTERACAO,
        this.Project.statusprojeto = data.STATUSPROJETO,
        this.Project.idvenda = data.IDVENDA!,
        this.Project.horasestimadas = data.HORASESTIMADAS!,
        this.Project.horasgastas = data.HORASGASTAS!,
        this.Project.saldohoras = data.SALDOHORAS!,
        this.Project.valorprojeto = data.VALORPROJETO!,
        this.Project.valorconsumido = data.VALORCONSUMIDO!

        this.Project.dtinicioprojeto = this.formatService.formatDate(data.DTINCIOPROJETO!)
        this.Project.dtconclusaoprojeto = this.formatService.formatDate(data.DTCONCLUSAOPROJETO!)

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

  openDialog() {
    const dialogRef = this.dialog.open(ClientComponent, {
      width: '1000px',
      height: '501px',
      panelClass: 'dialog-with-scrollbar',
      data: { isModal: true }
  });
  
  dialogRef.componentInstance.isModal = true;

  }

  openContrato() {
    const dialogRef = this.dialog.open(VendaComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'dialog-with-scrollbar'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTarefas() {
    const dialogRef = this.dialog.open(TarefaComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'dialog-with-scrollbar'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openProjetoTarefa() {
    const dialogRef = this.dialog.open(ProjetoTarefaComponent, {
      width: '1000px',
      height: '500px',
      panelClass: 'dialog-with-scrollbar'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  registerProject (form: NgForm) { 
    console.log(this.Project)
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
        idcliente: this.Project.idcliente.replace(/[^0-9]/g, ''),
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

  BuscarContratosDoCliente(){
    this.contratosDoCliente$ = this.contractService.contractsClient(parseInt(this.Project.idcliente));
    console.log(this.Project)
  }


}
