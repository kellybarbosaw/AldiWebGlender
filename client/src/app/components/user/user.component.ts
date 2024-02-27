import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ClientsComponent } from '../clients/clients.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ClientsComponent,RouterOutlet,CommonModule,RouterLink,RouterLinkActive,],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  usuario:string | null= '';
  perfil:string | null= '';

  constructor(private logiService:LoginService){}
  
  ngOnInit(){

    this.usuario = this.logiService.user.name
    this.perfil = this.logiService.user.perfil

    if(!this.usuario || !this.perfil){
    this.usuario = localStorage.getItem('user')
    this.perfil = localStorage.getItem('perfil')
    }
  }

  deslogar(){
    this.logiService.clearValidate();
  }

}

