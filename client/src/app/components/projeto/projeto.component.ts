import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { FormatsService } from "../../services/formats.service";


@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.scss'
})
export class ProjetoComponent {

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
  dateObj = '2024-10-05T13:58:00.000Z';




  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute, private formatService: FormatsService) {

    this.Project.idprojeto = this.route.snapshot.params['id']

    this.projectService.projectCurrent(this.route.snapshot.params['id'])
      .subscribe((datas) => {
        const data = datas[0];
        // console.log(data);
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
        // this.dataInicioProjeto.value = '2024-05-28';
        // this.Project.dtconclusaoprojeto = data.DTCONCLUSAOPROJETO!;
        this.Project.horasestimadas = data.HORASESTIMADAS!;
        this.Project.horasgastas = data.HORASGASTAS!;
        this.Project.saldohoras = data.SALDOHORAS!;
        this.Project.valorprojeto = data.VALORPROJETO!;
        this.Project.valorconsumido = data.VALORCONSUMIDO!;

        // this.Project.dtinicioprojeto = this.formatService.format(data.DTINCIOPROJETO!, "dtcriacao","date");
        // this.Project.dtconclusaoprojeto = this.formatService.format(data.DTCONCLUSAOPROJETO!, "dtconclusaoprojeto","date");
      });


  }


  editProject() {
    this.router.navigate([`/user/projeto/${'edit'}/${this.Project.idprojeto}`]);
  }
  deleteProject() {
    alert("deseja realmente deletar?")
    this.projectService.deleteProject(this.Project.idprojeto)
      .subscribe(() => { this.router.navigate([`/user/contrato/${this.Project.idvenda}`]) })
  }

}
