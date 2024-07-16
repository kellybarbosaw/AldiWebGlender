import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormatsService } from '../../services/formats.service';

@Component({
  selector: 'app-visaoProjeto',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './visaoProjeto.component.html',
  styleUrl: './visaoProjeto.component.scss'
})
export class VisaoProjetoComponent {
  projectExclude = 0;
  Projetos$ = new Observable<Project[]>();
  idProjeto: number = 0;
  project: Project | null = null;

  Project = {
    idprojeto: 0,
    titulo: '',
    descricao: '',
    idcliente: '',
    dtcriacao: '',
    dtalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    statusprojeto: 0,
    idvenda: 0,
    dtinicioprojeto: '',
    dtconclusaoprojeto: '',
    horasestimadas: '',
    horasgastas: '',
    saldohoras: '',
    valorprojeto: 0,
    valorconsumido: 0
    }

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute, 
    private formatService: FormatsService,
    private projetoService: ProjectService,) {

    this.Project.idprojeto = this.route.snapshot.params['id']
    this.Project.titulo = this.route.snapshot.params['id']

    this.projectService.projectCurrent(this.route.snapshot.params['id'])
      .subscribe((datas) => {
        const data = datas[0];
        this.Project.idprojeto = data.IDPROJETO!;
        this.Project.titulo = data.TITULO;
        this.Project.descricao = data.DESCRICAO;
        this.Project.idcliente = data.IDCLIENTE;
        this.Project.dtcriacao = data.DTCRIACAO;
        this.Project.dtalteracao = data.DTALTERACAO!;
        this.Project.usuariocriacao = data.USUARIOCRIACAO;
        this.Project.usuarioalteracao = data.USUARIOALTERACAO;
        this.Project.statusprojeto = data.STATUSPROJETO;
        this.Project.idvenda = data.IDVENDA;
        this.Project.horasestimadas = data.HORASESTIMADAS!;
        this.Project.horasgastas = data.HORASGASTAS!;
        this.Project.saldohoras = data.SALDOHORAS!;
        this.Project.valorprojeto = data.VALORPROJETO!;
        this.Project.valorconsumido = data.VALORCONSUMIDO!;
        this.Project.dtinicioprojeto = this.formatService.format(data.DTCRIACAO!, "dtinicioprojeto","date");
        this.Project.dtconclusaoprojeto = this.formatService.format(data.DTCONCLUSAOPROJETO!, "dtconclusaoprojeto","date");
      });
  }
  ngOnInit() { this.Projetos$ = this.projetoService.allProjects();}
}
