import { Component, DoCheck } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProjetoTarefaService } from '../../services/projetoTarefa.service';
import { Observable, catchError, of } from 'rxjs';
import { ProjetoTarefadbDB } from '../../models/projetoTarefa.model';
import { ProjetoTarefaComponent } from '../projeto-tarefa/projeto-tarefa.component';
import { RouterLink } from '@angular/router';
import { TarefaComponent } from '../_Tarefas/tarefa/tarefa.component';
import { Client } from '../../models/client.model';
import { ClientService } from "../../services/client.service";
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

/**
 * @title Drag&Drop connected sorting group
 */

export class DialogContentExampleDialog { }
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule,
    DragDropModule, CommonModule, MatIconModule, MatDialogModule, RouterLink],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements DoCheck {
  projetoTarefa$ = new Observable<ProjetoTarefadbDB[]>();

  todo: Array<ProjetoTarefadbDB> = [];
  emAndamento: Array<ProjetoTarefadbDB> = [];
  concluido: Array<ProjetoTarefadbDB> = [];
  impedidos: Array<ProjetoTarefadbDB> = [];
  naoPlanejados: Array<ProjetoTarefadbDB> = [];

  newTodo: string = '';
  newEmAndamento: string = '';
  newConcluido: string = '';
  newImpedidos: string = '';
  newNaoPlanejados: string = '';

  client$ = new Observable<Client[]>();
  Projetos$ = new Observable<Project[]>();

  clienteEscolhido = {
    idcliente: 0,
    nome: ''
  }

  ProjetoEscolhido = {
    idprojeto: 0,
    nome: ''
  }


  // teste: string[] = ['Cadastrar Clientes', 'Cadastrar Pessoas', 'Cadastrar Objetos']

  constructor(public dialog: MatDialog,
    private projetoTarefaService: ProjetoTarefaService,
    private clienteService: ClientService,
    private projetoService: ProjectService
  ) {
  }


  ngOnInit() {
    // this.SeparaTarefasPorEtapa(this.projetoTarefa);
    this.client$ = this.clienteService.Allclients();
    this.Projetos$ = this.projetoService.allProjects();

    this.projetoTarefaService.allProjetoTarefa().subscribe((data) => {
      this.SeparaTarefasPorEtapa(data)
    });
  }

  recarregar() {
    this.todo = [];
    this.emAndamento = [];
    this.concluido = [];
    this.impedidos = [];
    this.naoPlanejados = []
  }

  buscarTarefasFiltro() {
    this.recarregar();

    if (this.ProjetoEscolhido.idprojeto != 0) {
      this.BuscaTaredasPorProjeto(this.ProjetoEscolhido.idprojeto.toString());
    } else if (this.ProjetoEscolhido.idprojeto == 0 && this.clienteEscolhido.idcliente != 0) {
      this.BuscaTaredasPorCliente(this.clienteEscolhido.idcliente.toString());
    }
    else {
      this.ngOnInit();
    }
  }

  tarefasBuscaCliente(idCliente: number) {
    if (this.clienteEscolhido.idcliente != 0) this.Projetos$ = this.projetoService.projectsWithClients(idCliente)
    else this.Projetos$ = this.projetoService.allProjects();
  }

  // tarefasBuscaProjeto(idprojeto: number) {
  //   this.recarregar();
  //   this.BuscaTaredasPorProjeto(idprojeto.toString());
  // }

  BuscaTaredasPorProjeto(idprojeto: string) {
    this.projetoTarefa$ = this.projetoTarefaService.selectProjetoTarefaDoProjeto(idprojeto);
    this.projetoTarefaService.selectProjetoTarefaDoProjeto(idprojeto).subscribe((data) => {

      this.SeparaTarefasPorEtapa(data)
    })
  }
  BuscaTaredasPorCliente(idCliente: string) {
    this.projetoTarefaService.selectProjetoTarefaComCliente(idCliente).subscribe((data) => {

      this.SeparaTarefasPorEtapa(data)
    })
  }


  SeparaTarefasPorEtapa(data: ProjetoTarefadbDB[]) {

    data.forEach(element => {
      switch (element.ETAPA.toString()) {
        case '1':
          this.todo.push(element);
          break;
        case '2':
          this.emAndamento.push(element);
          break;
        case '3':
          this.concluido.push(element);
          break;
        case '4':
          this.impedidos.push(element);
          break;
        case '5':
          this.naoPlanejados.push(element);
          break;
        default:
          break;
      }
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjetoTarefaComponent, {
      width: '900px',
      height: '450px',
      panelClass: 'dialog-with-scrollbar',
      data: { isModal: true },
    });
    dialogRef.componentInstance.isModal = true;
  }

  ngDoCheck() {
    // Força a detecção de alterações para atualizar a visualização quando novas tarefas são adicionadas
    // Esta não é a abordagem mais eficiente, mas funciona para este caso simples
    // Em um cenário real, você usaria um método mais eficiente, como Observables
    // ou o pipe assíncrono
    this.todo = [...this.todo];
  }

  TrocarEtapa(etapa: number, id: string) {
    this.projetoTarefaService.editProjetoTarefaEtapa(etapa, id)
      .pipe(
        catchError(err => {
          console.log(err)
          return of();
        })
      ).subscribe((data) => {
        // this.recarregar();
      })
  }

  drop(event: CdkDragDrop<Array<ProjetoTarefadbDB>>) {

    if (event.previousContainer === event.container) {
      // Se o item for descartado na mesma lista, basta reordenar a lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Se o item for descartado em uma lista diferente, transfere o item
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let idTroca = event.container.data[event.currentIndex].IDPROJETOTAREFA!;
      switch (event.container.id) {
        case "cdk-drop-list-0":
          this.TrocarEtapa(1, idTroca)
          break;
        case "cdk-drop-list-1":
          this.TrocarEtapa(2, idTroca)
          break;
        case "cdk-drop-list-2":
          this.TrocarEtapa(3, idTroca)
          break;
        case "cdk-drop-list-3":
          this.TrocarEtapa(4, idTroca)
          this.openDialog();
          break;
        case "cdk-drop-list-4":
          this.TrocarEtapa(5, idTroca)
          break;
        default:
          console.log(event.container.id)
          //alert("error!")
          break;
      }

      // console.log(event)
      // console.log(event.container.data[event.currentIndex].IDPROJETOTAREFA)
      // console.log(event.container.id)

    }
  }
  addTodo() {
    if (this.newTodo.trim() !== '') {
      console.log(this.newTodo.trim())
      // this.todo.push(this.newTodo.trim());
      this.newTodo = ''; // Limpar entrada após adicionar
    }
  }
  addEmAndamento() {
    if (this.newEmAndamento.trim() !== '') {
      // this.emAndamento.push(this.newEmAndamento.trim());
      this.newEmAndamento = ''; // Limpar entrada após adicionar
    }
  }
  addConcluido() {
    if (this.newConcluido.trim() !== '') {
      // this.concluido.push(this.newConcluido.trim());
      this.newConcluido = ''; // Limpar entrada após adicionar
    }
  }
  addImpedidos() {
    if (this.newImpedidos.trim() !== '') {
      // this.impedidos.push(this.newImpedidos.trim());
      this.newImpedidos = ''; // Limpar entrada após adicionar
    }
  }
  addNaoPlanejados() {
    if (this.newNaoPlanejados.trim() !== '') {
      // this.naoPlanejados.push(this.newNaoPlanejados.trim());
      console.log(this.newNaoPlanejados.trim())
      // this.projetoTarefaService.editProjetoTarefaEtapa()
      this.newNaoPlanejados = ''; // Limpar entrada após adicionar
    }
  }


}