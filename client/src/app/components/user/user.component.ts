import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ClientsComponent,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  

}

