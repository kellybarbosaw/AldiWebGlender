import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultoriaFluig',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultoriaFluig.component.html',
  styleUrl: './consultoriaFluig.component.scss'
})
export class ConsultoriaFluigComponent {
  constructor(private router: Router) {}
  rm() {
    this.router.navigate(['/rm']);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  protheus() {
    this.router.navigate(['/protheus']);
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
