import { Component, DoCheck } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { Console } from 'console';

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

  todo:  Object[] = [];
  emAndamento: Object[] = [];
  concluido: Object[] = [];
  impedidos: Object[] = [];
  naoPlanejados: Object[] = [];

  newTodo: string = '';
  newEmAndamento: string = '';
  newConcluido: string = '';
  newImpedidos: string = '';
  newNaoPlanejados: string = '';


  teste: string[] = ['Cadastrar Clientes', 'Cadastrar Pessoas', 'Cadastrar Objetos']

  constructor(public dialog: MatDialog,
    private projetoTarefaService: ProjetoTarefaService) {
  }


  ngOnInit() {
    this.testeInfoBanco();
    console.log("this.todo")
    console.log(this.todo)
  }

  recarregar() {
    this.todo = [];
    this.emAndamento = [];
    this.concluido = [];
    this.impedidos = [];
    this.naoPlanejados = []

    this.ngOnInit();
  }

  testeInfoBanco() {
    this.projetoTarefa$ = this.projetoTarefaService.selecProjetoTarefaDoProjeto('25');
    this.projetoTarefaService.selecProjetoTarefaDoProjeto('25').subscribe((data) => {


      data.forEach(element => {
        switch (element.ETAPA.toString()) {
          case '1':
            this.todo.push({id:element.IDPROJETOTAREFA, titulo:element.TITULOTAREFA.trim()});
            break;
          case '2':
            this.emAndamento.push({id:element.IDPROJETOTAREFA, titulo:element.TITULOTAREFA.trim()});
            break;
          case '3':
            this.concluido.push({id:element.IDPROJETOTAREFA, titulo:element.TITULOTAREFA.trim()});
            break;
          case '4':
            this.impedidos.push({id:element.IDPROJETOTAREFA, titulo:element.TITULOTAREFA.trim()});
            break;
          case '5':
            this.naoPlanejados.push({id:element.IDPROJETOTAREFA, titulo:element.TITULOTAREFA.trim()});
            break;
          default:
            break;
        }
      });
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjetoTarefaComponent, {
      width: '900px',
      height: '450px',
      panelClass: 'dialog-with-scrollbar'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openEdit() {
  //   const dialogRef = this.dialog.open(TarefaComponent, {
  //     width: '900px',
  //     height: '450px',
  //     panelClass: 'dialog-with-scrollbar'
  // });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  ngDoCheck() {
    // Força a detecção de alterações para atualizar a visualização quando novas tarefas são adicionadas
    // Esta não é a abordagem mais eficiente, mas funciona para este caso simples
    // Em um cenário real, você usaria um método mais eficiente, como Observables
    // ou o pipe assíncrono
    this.todo = [...this.todo];
  }

  testeF() {
    this.projetoTarefaService.editProjetoTarefaEtapa(5, 10)
      .pipe(
        catchError(err => {
          console.log(err)
          return of();
        })
      ).subscribe((data) => {
        this.recarregar();
      })
    // this.projetoTarefaService.deleteProjetoTarefa(`2`)
  }

  drop(event: CdkDragDrop<object[]>) {

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
      console.log(event)
      console.log(event.container.data)
    }
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      console.log(this.newTodo.trim())
      this.todo.push(this.newTodo.trim());
      this.newTodo = ''; // Limpar entrada após adicionar
    }
  }
  addEmAndamento() {
    if (this.newEmAndamento.trim() !== '') {
      this.emAndamento.push(this.newEmAndamento.trim());
      this.newEmAndamento = ''; // Limpar entrada após adicionar
    }
  }
  addConcluido() {
    if (this.newConcluido.trim() !== '') {
      this.concluido.push(this.newConcluido.trim());
      this.newConcluido = ''; // Limpar entrada após adicionar
    }
  }
  addImpedidos() {
    if (this.newImpedidos.trim() !== '') {
      this.impedidos.push(this.newImpedidos.trim());
      this.newImpedidos = ''; // Limpar entrada após adicionar
    }
  }
  addNaoPlanejados() {
    if (this.newNaoPlanejados.trim() !== '') {
      this.naoPlanejados.push(this.newNaoPlanejados.trim());
      console.log(this.newNaoPlanejados.trim())
      // this.projetoTarefaService.editProjetoTarefaEtapa()
      this.newNaoPlanejados = ''; // Limpar entrada após adicionar
    }
  }


}