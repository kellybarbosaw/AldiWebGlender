import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss'
})
export class TesteComponent{
  
  // showSidebar = false;

  // toggleSidebar(): void {
  //   this.showSidebar = !this.showSidebar;
  // }

  // closeSidebar(): void {
  //   if (this.showSidebar) {
  //     this.showSidebar = false;
  //   }
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   if (window.innerWidth > 768 && this.showSidebar) {
  //     this.showSidebar = false;
  //   }
  // }
  cards = [
    { title: 'Card 1', description: 'Conteúdo do Card 1' },
    { title: 'Card 2', description: 'Conteúdo do Card 2' },
    { title: 'Card 3', description: 'Conteúdo do Card 3' },
    { title: 'Card 4', description: 'Conteúdo do Card 4' },
  ];
}
