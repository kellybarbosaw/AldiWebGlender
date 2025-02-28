import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ClientsComponent } from '../_Clientes/clients/clients.component';


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
  menuAberto = true;

  constructor(private logiService:LoginService){}
  
  showSidebar = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar(): void {
    if (this.showSidebar) {
      this.showSidebar = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth > 768 && this.showSidebar) {
      this.showSidebar = false;
    }
  }

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

