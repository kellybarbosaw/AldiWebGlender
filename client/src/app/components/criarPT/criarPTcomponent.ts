import { Component, Inject } from '@angular/core';
import { ProjetoTarefaComponent } from '../projeto-tarefa/projeto-tarefa.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

interface QueryParams {
  projetoId?: string; // Pode ser string ou undefined
}
@Component({
  selector: 'app-criarPT',
  standalone: true,
  imports: [MatDialogModule],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  templateUrl: './criarPT.component.html',
  styleUrl: './criarPT.component.scss'
})
export class CriarPTComponent {
  isModal: boolean;
  projetoId: number | null = null;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { isModal: boolean }
  ) {

    this.isModal = data.isModal;
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe((params: QueryParams) => {
      this.projetoId = params.projetoId ? +params.projetoId : null; // Converta para número ou defina como null
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
}
