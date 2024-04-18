import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router'


@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {

  constructor(private router:Router){
  }


  login(){
    this.router.navigate(['/login'])
  }
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
