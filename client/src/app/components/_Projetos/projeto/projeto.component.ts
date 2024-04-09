import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { FormatsService } from "../../../services/formats.service";
import { catchError, of } from 'rxjs';
import { MensageriaService } from '../../../services/mensageria.service';


@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent {
  projectExclude = 0;

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
    private router: Router, 
    private route: ActivatedRoute, 
    private formatService: FormatsService,
    private messageriaService: MensageriaService) {

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
  }


  editProject() {
    this.router.navigate([`/user/projeto/${'edit'}/${this.Project.idprojeto}`]);
  }
  excludeProject(id: number, event: string | null) {
    if (!event) this.projectExclude = id;
    if (event === 'clear') this.projectExclude = 0;
  }

  deleteProject(id: number){
    this.projectService.deleteProject(id)
    .pipe(
      catchError(err => {
        this.messageriaService.messagesRequest('Ocorreu um Erro',err.error.message,'messages','danger')
        return of();
      })
    ).subscribe(()=>{
      this.messageriaService.messagesRequest('Sucesso!', 'Contrato Excluído Com Sucesso!', 'messages', 'success')
      this.router.navigate([`/user/contrato/${this.Project.idvenda}`]) })
  }

}
