import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router'
import { Observable } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {


  allClient$ = new Observable<Client[]>();

  teste;

  constructor(private clientService:ClientService, private router:Router){

    this.allClient$ = this.clientService.allClients();
    this.teste = this.clientService.allClients()

    console.log(this.teste)
  }


  verClient(client: Client){
    this.router.navigate([`/user/client360/${client.IDCLIENTE}`]);
  }
  editClient(client: Client){
    this.router.navigate([`/user/client/${client.IDCLIENTE}`]);
  }

  deletClient(id: number){
    alert("deseja realmente deletar esse iten?" +id);
    this.clientService.deleteClient(id).subscribe(()=>{this.allClient$ = this.clientService.allClients()})
  }

}
