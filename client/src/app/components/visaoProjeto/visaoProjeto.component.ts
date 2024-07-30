import { Component, OnInit } from '@angular/core';
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
export class VisaoProjetoComponent implements OnInit{
  Projetos$ = new Observable<Project[]>;

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
    valorconsumido: 0,
    nome: ''
    }
    client = {
      idcliente: 0,
      nome: ''
    }
    projetoTarefa = {
      idprojetotarefa:'',
      idtarefa: '',
      idprojeto: '',
      titulotarefa: '',
      descricaotarefa: '',
      datainicioprevista: '',
      datafimprevista: '',
      dtcriacao: '',
      dtalteracao: '',
      usuariocriacao: '',
      usuarioalteracao: '',
      horasestimadas: '',
      horasgastas: '',
      saldohoras: '',
      etapa: ''
    };

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute, 
    private formatService: FormatsService,
    private projetoService: ProjectService,
    private router: Router) {

    this.Project.idprojeto = this.route.snapshot.params['id']

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
      console.log(this.Projetos$);
  }
  ngOnInit(): void {
    this.Projetos$ = this.projetoService.allProjects();
  }

  clearFields(): void {
    this.Project.titulo = '';
    this.Project.descricao = '';
    this.Project.idcliente = '';
    this.Project.dtcriacao = '';
    this.Project.dtalteracao = '';
    this.Project.usuariocriacao = '';
    this.Project.usuarioalteracao = '';
    this.Project.statusprojeto = 0;
    this.Project.idvenda = 0;
    this.Project.dtinicioprojeto = '';
    this.Project.dtconclusaoprojeto = '';
    this.Project.horasestimadas = '';
    this.Project.horasgastas = '';
    this.Project.saldohoras = '';
    this.Project.valorprojeto = 0;
    this.Project.valorconsumido = 0;
  }
  onProjectChanges(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProjectId = selectElement.value;
    console.log(selectedProjectId);
    // Obtém o caminho atual
    const currentUrl = '/user/visaoProjeto/' + selectedProjectId;

    // Navega para o mesmo caminho, o que efetivamente recarrega a página
    this.router.navigateByUrl('/user/visaoProjeto' + selectedProjectId, { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  onProjectChange(event: number) {
    this.Projetos$.subscribe(projects => {
      console.log('Projetos$ emitted:', projects);
      const selectedProject = projects.find(project => project.IDPROJETO === event);
      console.log('selectedProject:', selectedProject);
      if (selectedProject) {
        this.Project = {
          idprojeto: selectedProject.IDPROJETO!,
          titulo: selectedProject.TITULO,
          descricao: selectedProject.DESCRICAO,
          idcliente: selectedProject.IDCLIENTE,
          dtcriacao: selectedProject.DTCRIACAO,
          dtalteracao: selectedProject.DTALTERACAO!,
          usuariocriacao: selectedProject.USUARIOCRIACAO,
          usuarioalteracao: selectedProject.USUARIOALTERACAO,
          statusprojeto: selectedProject.STATUSPROJETO,
          idvenda: selectedProject.IDVENDA,
          horasestimadas: selectedProject.HORASESTIMADAS!,
          horasgastas: selectedProject.HORASGASTAS!,
          saldohoras: selectedProject.SALDOHORAS!,
          valorprojeto: selectedProject.VALORPROJETO!,
          valorconsumido: selectedProject.VALORCONSUMIDO!,
          nome: selectedProject.NOME!,
          dtinicioprojeto: this.formatService.format(selectedProject.DTCRIACAO!, "dtinicioprojeto", "date"),
          dtconclusaoprojeto: this.formatService.format(selectedProject.DTCONCLUSAOPROJETO!, "dtconclusaoprojeto", "date"),
        };
      }
    });
  }
}
