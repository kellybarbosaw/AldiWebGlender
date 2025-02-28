import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-aldiwebsite',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './aldiwebsite.component.html',
  styleUrl: './aldiwebsite.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AldiwebsiteComponent{

  showSidebar = false;

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar(): void {
    if (this.showSidebar) {
      this.showSidebar = false;
    }
  }

  hexGrid: { color: string }[][] = [];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.generateHexGrid();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.generateHexGrid();
    }
  }

  generateHexGrid(): void {
    if (!this.isBrowser) return;

    const hexWidth = 68.6;
    const hexHeight = 115.47;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const cols = Math.ceil(screenWidth / hexWidth) + 1;
    const rows = Math.ceil(screenHeight / (hexHeight * 0.75));

    this.hexGrid = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, () => ({
        color: '#111'
      }))
    );
  }

  changeColor(rowIndex: number, colIndex: number) {
    this.hexGrid[rowIndex][colIndex].color = '#944300';

    setTimeout(() => {
        this.hexGrid[rowIndex][colIndex].color = '#111';
    }, 1000);
}


  items = [
    {
      img: '../../../assets/images/Implantacao.png',
      title: 'Implantação de Soluções Personalizadas',
      description: 'Implantação de soluções completas para que todos os departamentos operem com eficiência, utilizando módulos específicos do ERP.'
    },
    {
      img: '../../../assets/images/Suporte.png',
      title: 'Suporte Especializado',
      description: 'Aqui, excelência e agilidade no atendimento são nossa prioridade, garantindo suporte especializado sempre que necessário.'
    },
    {
      img: '../../../assets/images/Adequacao.png',
      title: 'Adequação Fiscal',
      description: 'Soluções TOTVS com base na legislação vigente, garantindo uma parametrização correta para o envio das obrigações fiscais.'
    },
    {
      img: '../../../assets/images/Integracao.png',
      title: 'Integração de Sistemas',
      description: 'Oferecemos integrações complexas em um único software, unificando operações e otimizando performance.'
    },
    {
      img: '../../../assets/images/Costumizacao.png',
      title: 'Customizações Sob Medida',
      description: 'Adapte o sistema às necessidades da sua empresa, ajustando-o de acordo com seus processos internos.'
    },
    {
      img: '../../../assets/images/Manutencao.png',
      title: 'Manutenção e Evolução',
      description: 'Mantenha seu sistema sempre atualizado conforme as especificações da provedora e com o acompanhamento dos nossos especialistas.'
    }
  ];
  
}
