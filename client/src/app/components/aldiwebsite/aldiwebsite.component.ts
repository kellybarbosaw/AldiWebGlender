import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, AfterViewInit, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-aldiwebsite',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './aldiwebsite.component.html',
  styleUrl: './aldiwebsite.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AldiwebsiteComponent{
  @ViewChild('carousel') carousel!: ElementRef;

  cards = [
    {
      img: '../../../assets/images/hex/hex-rm.png',
      alt: 'RM',
      text: 'Soluções de gestão de recursos para otimizar processos e controlar estoques com eficiência.',
      action: () => this.rm()
    },
    {
      img: '../../../assets/images/hex/hex-protheus.png',
      alt: 'PROTHEUS',
      text: 'Consultoria para implementação e otimização do ERP Protheus, garantindo controle e eficiência.',
      action: () => this.protheus()
    },
    {
      img: '../../../assets/images/hex/hex-fluig.png',
      alt: 'FLUIG',
      text: 'Plataforma de automação e gestão de processos para integrar e agilizar a comunicação interna.',
      action: () => this.fluig()
    },
    {
      img: '../../../assets/images/hex/hex-bpo.png',
      alt: 'BPO',
      text: 'Gestão completa de folha de pagamento, com foco em conformidade e eficiência operacional.',
      action: () => this.bpo()
    }
  ];

  isMobile = false;
  currentIndex = 0;
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

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
  bpo() {
    this.router.navigate(['/bpo']);
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }

  // ngAfterViewInit() {
  //   this.route.fragment.subscribe(fragment => {
  //     if (fragment) {
  //       const element = document.getElementById(fragment);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }
  //   });
  // }

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private route: ActivatedRoute) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateIsMobile();
      this.onScroll();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIsMobile();

    if (this.isBrowser) {
    this.generateHexGrid();
    }
  }

  updateIsMobile() {
    this.isMobile = window.innerWidth < 1024;
  }

  onScroll() {
    const el = this.carousel.nativeElement;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.children[0].clientWidth;
    this.currentIndex = Math.round(scrollLeft / cardWidth);
  }
  

  scrollToCard(index: number) {
    const el = this.carousel.nativeElement;
    const card = el.children[index] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
  }
  

  // Ações dos botões
  // rmbtn() { console.log('Clique em RM'); }
  // protheusbtn() { console.log('Clique em Protheus'); }
  // fluigbtn() { console.log('Clique em Fluig'); }
  // bpobtn() { console.log('Clique em BPO'); }
  

  ngOnInit(): void {
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
      img: '../../../assets/images/hex/Implantacao.png',
      title: 'Implantação de Soluções Personalizadas',
      description: 'Implantação de soluções completas para que todos os departamentos operem com eficiência, utilizando módulos específicos do ERP.'
    },
    {
      img: '../../../assets/images/hex/Suporte.png',
      title: 'Suporte Especializado',
      description: 'Aqui, excelência e agilidade no atendimento são nossa prioridade, garantindo suporte especializado sempre que necessário.'
    },
    {
      img: '../../../assets/images/hex/Adequacao.png',
      title: 'Adequação Fiscal',
      description: 'Soluções TOTVS com base na legislação vigente, garantindo uma parametrização correta para o envio das obrigações fiscais.'
    },
    {
      img: '../../../assets/images/hex/Integracao.png',
      title: 'Integração de Sistemas',
      description: 'Oferecemos integrações complexas em um único software, unificando operações e otimizando performance.'
    },
    {
      img: '../../../assets/images/hex/Costumizacao.png',
      title: 'Customizações Sob Medida',
      description: 'Adapte o sistema às necessidades da sua empresa, ajustando-o de acordo com seus processos internos.'
    },
    {
      img: '../../../assets/images/hex/Manutencao.png',
      title: 'Manutenção e Evolução',
      description: 'Mantenha seu sistema sempre atualizado conforme as especificações da provedora e com o acompanhamento dos nossos especialistas.'
    }
  ];
  
}
