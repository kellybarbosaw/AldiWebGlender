import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ClientsComponent } from '../clients/clients.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ClientsComponent,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private logiService:LoginService){}

  usuario = this.logiService.name;
  deslogar(){
    this.logiService.clearValidate();
  }

}

