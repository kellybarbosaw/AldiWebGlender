import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, Observable, of, Subject } from 'rxjs';
import { Contract } from '../../../models/contract.model';
import { ContractService } from '../../../services/contract.service';
import { LoginService } from '../../../services/login.service';
import { MensageriaService } from '../../../services/mensageria.service';

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.scss'
})
export class ContratosComponent {

  error$ = new Subject<boolean>();
  allContratos$ = new Observable<Contract[]>();

  contratoExclude = 0;

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas:number[] = [];
  qtdContrato = 0;
  qtdMostrado = 5;

  constructor(
    private contractService: ContractService, 
    private loginService: LoginService,
    private messageriaService: MensageriaService
    ) { }

  ngOnInit(){
    this.paginas = [];
    this.contractService.getContractsWithHeaders(this.offset, this.limit)
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
    ).subscribe({
      next: (result) => {        
        this.allContratos$ = this.contractService.allContract$;
        this.qtdContrato = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdContrato/this.limit) ; index++) {
          this.paginas.push(index);
        }
        if(this.qtdMostrado > this.qtdContrato) this.qtdMostrado = this.qtdContrato

      },
      error: (err) => {
        this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
      }
    });
  }

  excludeContrato(id: number, event: string | null) {
    if (!event) this.contratoExclude = id;
    if (event === 'clear') this.contratoExclude = 0;
  }

  deletContrato(id: number) {
    this.contractService.deleteContract(id)
      .pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          return of();
        })
      )
      .subscribe(() => { 
        this.messageriaService.messagesRequest('Sucesso!', 'Cliente Excluído Com Sucesso!', 'messages', 'success')
        this.ngOnInit() 
      })
  }

  buscar() {
    this.offset = 0;
    this.paginar(1)
  }

  paginar(pagina: number) {
    this.paginaAtual = pagina;
    let of = pagina - 1
    this.offset = (of * this.limit);
    this.qtdMostrado = (pagina*this.limit)
    if(this.qtdMostrado > this.qtdContrato) this.qtdMostrado = this.qtdContrato
    this.ngOnInit()
  }

  passar(type:string){
    switch (type) {
      case 'next':
        if(this.paginaAtual >= this.paginas.length)return
        this.paginaAtual += 1;
        this.paginar(this.paginaAtual)     
        break;
      case 'back':
        if(this.paginaAtual === 1)return
        this.paginaAtual -= 1;
        this.paginar(this.paginaAtual)
        break;
    }
  }

}
