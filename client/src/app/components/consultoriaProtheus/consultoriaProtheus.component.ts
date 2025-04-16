import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultoriaProtheus',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultoriaProtheus.component.html',
  styleUrl: './consultoriaProtheus.component.scss'
})
export class ConsultoriaProtheusComponent {
    constructor(private router: Router) {}
    rm() {
      this.router.navigate(['/rm']);
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
