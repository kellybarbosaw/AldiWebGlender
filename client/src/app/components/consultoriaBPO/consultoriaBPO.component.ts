import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultoriaBPO',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultoriaBPO.component.html',
  styleUrl: './consultoriaBPO.component.scss'
})
export class ConsultoriaBPOComponent {
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
  fluig() {
    this.router.navigate(['/fluig']);
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }
}
