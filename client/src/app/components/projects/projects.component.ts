import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../services/contract.service';
import { ProjectService } from '../../services/project.service';
import { FormatsService } from "../../services/formats.service";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  datenow = '2024-01-16';


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
      valorprojeto: 0,
      valorconsumido: 0
    }

    dadosFicticios = {
      dtcriacao: '2024-01-29 12:26:00',
      dtmodificacao: '2024-01-29 12:26:00',
      usuariocriacao: 'usuario teste criacao',
      usuarioalteracao: 'usuario teste alteracao',
    }
  event = 'Cadastrar';


  constructor(private formatService: FormatsService,private projectService: ProjectService,private contractService: ContractService ,private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.params['event'] === 'new') {
      this.event = 'Cadastrar'
      this.Project.idvenda = this.route.snapshot.params['id'];
      this.contractService.contractCurrent(this.Project.idvenda).subscribe((data)=>{
        this.Project.idcliente = data[0].IDCLIENTE.toString()
      });

    } else if (this.route.snapshot.params['event'] === 'edit') {
      this.event = 'Editar'
      this.Project.idprojeto = this.route.snapshot.params['id'];

      this.projectService.projectCurrent(this.Project.idprojeto!)
      .subscribe((datas)=>{
        const data = datas[0];
        this.Project.idprojeto = data.IDPROJETO!,
        this.Project.titulo = data.TITULO,
        this.Project.descricao = data.DESCRICAO,
        this.Project.idcliente = data.IDCLIENTE,
        this.Project.dtcriacao = data.DTCRIACAO,
        this.Project.dtalteracao = data.DTALTERACAO,
        this.Project.usuariocriacao = data.USUARIOCRIACAO,
        this.Project.usuarioalteracao = data.USUARIOALTERACAO,
        this.Project.statusprojeto = data.STATUSPROJETO,
        this.Project.idvenda = data.IDVENDA!,
        this.Project.dtinicioprojeto = data.DTINCIOPROJETO!,
        this.Project.dtconclusaoprojeto = data.DTCONCLUSAOPROJETO!,
        this.Project.horasestimadas = data.HORASESTIMADAS!,
        this.Project.horasgastas = data.HORASGASTAS!,
        this.Project.saldohoras = data.SALDOHORAS!,
        this.Project.valorprojeto = data.VALORPROJETO!,
        this.Project.valorconsumido = data.VALORCONSUMIDO!

        this.Project.dtinicioprojeto = this.formatService.formatTime(data.DTINCIOPROJETO!,"dtinicioprojeto")
        this.Project.dtconclusaoprojeto = this.formatService.formatTime(data.DTCONCLUSAOPROJETO!,"dtconclusaoprojeto")

      })
    }else{
      alert("algo errado")
    }
  }


  registerProject () { 
    if (this.event === 'Cadastrar') {

      this.Project.dtcriacao = this.dadosFicticios.dtcriacao,
      this.Project.dtalteracao = this.dadosFicticios.dtmodificacao,
      this.Project.usuariocriacao = this.dadosFicticios.usuariocriacao,
      this.Project.usuarioalteracao = this.dadosFicticios.usuarioalteracao,

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
      }).subscribe((data) => { this.router.navigate([`/user/contrato/${this.Project.idvenda}`]) })
    } else if (this.event === 'Editar') {

      this.Project.dtcriacao = this.dadosFicticios.dtcriacao,
      this.Project.dtalteracao = this.dadosFicticios.dtmodificacao,
      this.Project.usuariocriacao = this.dadosFicticios.usuariocriacao,
      this.Project.usuarioalteracao = this.dadosFicticios.usuarioalteracao,

      this.projectService.editProject(this.Project).subscribe(()=>{
        this.router.navigate([`/user/contract/projeto/${this.Project.idprojeto}`]) 
      })


    } else {
      alert('algo deu errado')
    }
  }

  
}
