import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'
import { catchError, Observable, of, Subject } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule, HttpClientModule, FormsModule, CommonModule,RouterLink],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  error$ = new Subject<boolean>();

  allClient$ = new Observable<Client[]>();


  constructor(private clientService: ClientService, private router: Router, private loginService: LoginService) {

    //setTimeout para teste de lentidão
    setTimeout(() => {

      this.allClient$ = this.clientService.allClients()
        .pipe(
          catchError(err => {
            this.error$.next(true)

            setTimeout(() => {

              if (err.statusText === "Unauthorized") {
                alert("Seu iToken foi expirado! Realize o login novamente")
                this.loginService.deslogar();
              }

            }, 500);
            return of();
          })
        );
        
    }, 1000);
    // this.error$.next(true)

  }

  // verClient(client: Client) {
  //   this.router.navigate([`/user/client360/${client.IDCLIENTE}`]);
  // }
  // editClient(client: Client) {
  //   this.router.navigate([`/user/client/${client.IDCLIENTE}`]);
  // }

  deletClient(id: number) {
    alert("deseja realmente deletar esse iten?" + id);
    this.clientService.deleteClient(id).pipe(
      catchError(err => {
        alert(err.error.msg)
        return of();
      })
    ).subscribe(() => { this.allClient$ = this.clientService.allClients() })
  }

}
