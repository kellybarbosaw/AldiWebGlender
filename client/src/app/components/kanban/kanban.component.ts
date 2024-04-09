import {Component, DoCheck} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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
import { TarefaComponent } from '../_Tarefas/tarefa/tarefa.component';
import { ProjetoTarefaService } from '../../services/projetoTarefa.service';
import { Observable } from 'rxjs';
import { ProjetoTarefadbDB } from '../../models/projetoTarefa.model';

/**
 * @title Drag&Drop connected sorting group
 */

export class DialogContentExampleDialog {}
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag,FormsModule,
    DragDropModule,CommonModule,MatIconModule, MatDialogModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements DoCheck {
  projetoTarefa$ = new Observable<ProjetoTarefadbDB[]>();



  todo: string[] = [];
  emAndamento: string[] = [];
  concluido: string[] = [];
  impedidos: string[] = [];
  naoPlanejados: string[] = [];

  newTodo: string = '';
  newEmAndamento: string = '';
  newConcluido: string = '';
  newImpedidos: string = '';
  newNaoPlanejados: string = '';


  teste:string[] = ['Cadastrar Clientes','Cadastrar Pessoas','Cadastrar Objetos']

  constructor(public dialog: MatDialog,
    private projetoTarefaService: ProjetoTarefaService) {}


   ngOnInit(){
    this.testeInfoBanco();
   }

   testeInfoBanco(){
    this.projetoTarefa$ = this.projetoTarefaService.selecProjetoTarefaDoProjeto('25');
    this.projetoTarefaService.selecProjetoTarefaDoProjeto('25').subscribe((data)=>{
 
 
     data.forEach(element => {
       var teste;
       switch (element.ETAPA.toString()) {
         case '1':
           this.todo.push( element.TITULOTAREFA.trim());
           break;
         case '2':
           this.emAndamento.push( element.TITULOTAREFA.trim());
           break;
         case '3':
           this.concluido.push( element.TITULOTAREFA.trim());
           break;
         case '4':
           this.impedidos.push( element.TITULOTAREFA.trim());
           break;
         case '5':
           this.naoPlanejados.push( element.TITULOTAREFA.trim());
           break;
       
         default:
           break;
       }
       
     });
    })
   }

  openDialog() {
    const dialogRef = this.dialog.open(TarefaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngDoCheck() {
    // Força a detecção de alterações para atualizar a visualização quando novas tarefas são adicionadas
    // Esta não é a abordagem mais eficiente, mas funciona para este caso simples
    // Em um cenário real, você usaria um método mais eficiente, como Observables
    // ou o pipe assíncrono
    this.todo = [...this.todo];
  }

  drop(event: CdkDragDrop<string[]>) {
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
      this.newNaoPlanejados = ''; // Limpar entrada após adicionar
    }
  }
}

