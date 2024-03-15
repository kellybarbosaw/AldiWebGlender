import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { LoginService } from '../../services/login.service';
import { NgxMaskPipe } from 'ngx-mask';



@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterLink, NgxMaskPipe],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  error$ = new Subject<boolean>();

  allClient$ = new Observable<Client[]>();
  modalService: any;
  clientExclude = 0;
  offset = 0;
  limit = 5;

  pagina = 0;
  paginas = 0;
  qtdClients = 150;


  constructor(private clientService: ClientService, private loginService: LoginService) { }
  ngOnInit() {

    this.allClient$ = this.clientService.allClients(this.offset, this.limit)
      .pipe(
        tap((res)=>{
          console.log(res)
        }),
        catchError(err => {
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      )
  }

  event = "Excluir";
  excludeClient(id: number, event: string | null) {
    if (!event) this.clientExclude = id;
    if (event === 'clear') this.clientExclude = 0;
  }
  deletClient(id: number) {
    this.clientService.deleteClient(id)
      .pipe(
        catchError(err => {
          alert(err.error.msg)
          return of();
        })
      )
      .subscribe(() => { this.allClient$ = this.clientService.allClients(this.offset, this.limit) })
  }

  buscar() {
    this.offset = 0;
    this.ngOnInit();
  }

  paginar(pagina: number) {
    let of = pagina - 1
    this.offset = (of * this.limit);
    this.ngOnInit()
  }

}
