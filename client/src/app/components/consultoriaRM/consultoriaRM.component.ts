import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultoriaRM',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './consultoriaRM.component.html',
  styleUrl: './consultoriaRM.component.scss'
})
export class ConsultoriaRMComponent{
  constructor(private router: Router) {}
  protheus() {
    this.router.navigate(['/protheus']);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  fluig() {
    this.router.navigate(['/fluig']);
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }
  bpo() {
    this.router.navigate(['/bpo']);
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }
}
