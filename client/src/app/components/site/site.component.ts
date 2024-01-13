import { Component } from '@angular/core';
import { Router} from '@angular/router'


@Component({
  selector: 'app-site',
  standalone: true,
  imports: [],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {

  constructor(private router:Router){
  }


  login(){
    this.router.navigate(['/login'])
  }

}
