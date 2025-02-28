import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AgendaService } from '../../services/agenda.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormatsService } from '../../services/formats.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import { catchError, of, Subject, Observable } from 'rxjs';
import { AppComponent } from '../../app.component';
import { MensageriaService } from '../../services/mensageria.service';
import { LoginService } from '../../services/login.service';
import { Agenda, AgendaUser } from '../../models/agenda.model';

registerLocaleData(localePt, 'pt');
@Component({
  selector: 'agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterOutlet, AppComponent, NgxMaskDirective, RouterLink],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }, FormatsService],
})
export class AgendaComponent implements OnInit{
  error$ = new Subject<boolean>();
  agenda = {
    idagenda: '',
    atividade: '',
    empresaTrabalhada: '',
    horainicio: '',
    horafinal: '',
    horaalmoco: '',
    horaprevista: '',
    horarealizada: '00:00:00',
    data: '',
    status: 0,
    usuariocriacao: '',
  };
  
  event = 'Cadastrar';
  constructor(
    private agendaService: AgendaService,
    private formatService: FormatsService,
    private router: Router,
    private messageriaService: MensageriaService,
    private cdr: ChangeDetectorRef,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    
    this.agenda.idagenda = this.route.snapshot.params['id'];

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.agendaService.agendaCurrent(this.route.snapshot.params['id'])
      .pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      )
      .subscribe((datas: any) => {
        const data = datas[0];
        this.agenda.atividade = data.ATIVIDADE;
        this.agenda.data = this.formatService.formatDate(data.DATA!);
        this.agenda.horainicio = data.HORAINICIO;
        this.agenda.horafinal = data.HORAFINAL;
        this.agenda.horaalmoco = data.HORAALMOCO;
        this.agenda.horaprevista = data.HORAPREVISTA;
        this.agenda.horarealizada = data.HORAREALIZADA || '00:00:00';
        this.agenda.empresaTrabalhada = data.EMPRESATRABALHADA;
        this.agenda.status = data.STATUS;
        this.agenda.usuariocriacao = data.USUARIOCRIACAO;
      });
      this.event = 'Editar';
    }
  }

  // Retorna a empresa trabalhada para o dia específico
getEmpresaTrabalhada(dia: Date): string {
  const dataFiltrada = dia.toISOString().split('T')[0];
  const agendaDoDia = this.agendas.find(agenda => agenda.DATA === dataFiltrada);
  return agendaDoDia ? agendaDoDia.EMPRESATRABALHADA : null;
}

getClassePorStatus(status: any): string {
  const statusNumero = parseInt(status, 10);
  switch (statusNumero) {
    case 1:
      return 'bubble-orange';
    case 2:
      return 'bubble-red';
    case 3:
      return 'bubble-yellow';
    case 4:
      return 'bubble-blue';
    case 5:
      return 'bubble-gray';
    default:
      return 'bubble-black';
  }
}


registerAgenda(form: NgForm) {
  const formattedDate = new Date(this.agenda.data).toISOString().split('T')[0];
  if (formattedDate === 'Invalid Date') {
    alert('Data inválida! Por favor, verifique os campos preenchidos.');
    return;
  }

  // Validação de Campos Preenchidos
  if (
    !this.agenda.atividade || 
    !this.agenda.empresaTrabalhada || 
    !this.agenda.horainicio || 
    !this.agenda.horafinal || 
    !this.agenda.data || 
    !this.agenda.status || 
    !this.agenda.horaalmoco
  ) {
    alert('Preencha todos os campos obrigatórios.');
    this.camposPreenchidos = false;
    this.botaoClicado = true;
    console.log('Estado dos campos:', this.agenda);
    return;
  }

  if (!this.agenda.horaprevista) {
    this.calcularHorasPrevistas();
    this.agenda.horaprevista = this.horasPrevistas;
  }

   // Certifique-se de que `horarealizada` está preenchido
  if (!this.agenda.horarealizada) {
    this.agenda.horarealizada = '00:00:00';
  }

  const isCadastrar = this.event === 'Cadastrar';
  this.agenda.usuariocriacao = localStorage.getItem('user')!;
  const action = isCadastrar 
    ? this.agendaService.registerAgenda({
        data: this.agenda.data,
        horainicio: this.agenda.horainicio,
        horafinal: this.agenda.horafinal,
        horaalmoco: this.agenda.horaalmoco,
        horaprevista: this.agenda.horaprevista,
        horarealizada: this.agenda.horarealizada,
        atividade: this.agenda.atividade,
        empresaTrabalhada: this.agenda.empresaTrabalhada,
        status: this.agenda.status,
        usuariocriacao: this.agenda.usuariocriacao,
      }).pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      )
    : this.agendaService.editAgenda({
        idagenda: parseInt(this.agenda.idagenda, 10),
        data: this.agenda.data,
        horainicio: this.agenda.horainicio,
        horafinal: this.agenda.horafinal,
        horaalmoco: this.agenda.horaalmoco,
        horaprevista: this.agenda.horaprevista,
        horarealizada: this.agenda.horarealizada,
        atividade: this.agenda.atividade,
        empresaTrabalhada: this.agenda.empresaTrabalhada,
        status: this.agenda.status,
        usuariocriacao: this.agenda.usuariocriacao,
      });
      // action.subscribe(
      //   () => {
      //     alert(isCadastrar ? 'Agenda cadastrada com sucesso!' : 'Agenda atualizada com sucesso!');
      //     this.fecharModal();
      //     this.limparCamposFormulario();
      //     this.carregarAgendas();
      //     console.log('Agenda ao editar:', this.agenda);
      //   },
      //   (error) => {
      //     console.error(isCadastrar ? 'Erro ao cadastrar agenda:' : 'Erro ao atualizar agenda:', error);
      //     alert('Erro ao processar a agenda. Tente novamente.');
      //   }
      // );
  action.subscribe(
    () => {
      this.messageriaService.messagesRequest(
        'Sucesso!', 
        isCadastrar ? 'Agenda cadastrada com sucesso!' : 'Agenda atualizada com sucesso!', 
        'messages', 
        'success'
      );
      this.fecharModal();
      this.limparCamposFormulario();
      this.carregarAgendas();
      console.log('Agenda ao editar:', this.agenda);
    },
    (error) => {
      this.messageriaService.messagesRequest(
        'Erro!', 
        isCadastrar ? 'Erro ao cadastrar agenda.' : 'Erro ao atualizar agenda.', 
        'messages', 
        'error'
      );
      console.error(isCadastrar ? 'Erro ao cadastrar agenda:' : 'Erro ao atualizar agenda:', error);
    }
  );
}
  
  statusMap: { [key: number]: string } = {
    1: 'Agenda Concluída',
    2: 'Agenda Cancelada',
    3: 'Agenda Impedida',
    4: 'Agenda Em Andamento',
    5: 'Agenda Não Apontada',
  };

  getStatusText(status: number): string {
    return this.statusMap[status] || 'Status desconhecido';
  }

  abrirModalEdicao(agenda: any): void {
    this.agenda = {
      idagenda: agenda.IDAGENDA || '',
      atividade: agenda.ATIVIDADE || '',
      empresaTrabalhada: agenda.EMPRESATRABALHADA || '',
      horainicio: agenda.HORAINICIO || '',
      horafinal: agenda.HORAFINAL || '',
      horaalmoco: agenda.HORAALMOCO || '',
      horaprevista: agenda.HORAPREVISTA || '',
      horarealizada: agenda.HORAREALIZADA || '00:00:00',
      data: new Date(agenda.DATA).toISOString().split('T')[0], // Formata a data para o campo date
      status: agenda.STATUS || 0,
      usuariocriacao: agenda.USUARIOCRIACAO || '',
    };
    this.event = 'Editar';
    this.mostrarModal = true;
  }
  
  limparCamposFormulario(): void {
    this.agenda = {
      data: this.dataModal,
      atividade: '',
      idagenda: '',
      horainicio: '',
      horafinal: '',
      horaalmoco: '',
      horaprevista: '',
      horarealizada: '',
      empresaTrabalhada: '',
      status: 0,
      usuariocriacao: ''
    };
  }

  dataAtual: Date = new Date();
  diasCalendario: Date[] = [];
  diasSemana: string[] = [];
  mostrarModal: boolean = false;
  dataModal: string = '';
  agendasDoDia: any[] = [];
  botaoClicado: boolean = false;
  camposPreenchidos: boolean = true;
  agendas: any[] = [];
  horasPrevistas: string = '';
  todasAsAgendas: any[] = []; // Para o calendário
  agendasDoDiaModal: any[] = []; // Para o modal

  calcularHorasPrevistas() {
    const horaInicio = this.agenda.horainicio;
    const horaFim = this.agenda.horafinal;
    const horaAlmoco = this.agenda.horaalmoco;
  
    if (horaInicio && horaFim) {
      const [inicioHora, inicioMin] = horaInicio.split(':').map(Number);
      const [fimHora, fimMin] = horaFim.split(':').map(Number);
  
      const inicioEmMinutos = inicioHora * 60 + inicioMin;
      const fimEmMinutos = fimHora * 60 + fimMin;
  
      let diferencaEmMinutos = fimEmMinutos - inicioEmMinutos;
  
      if (horaAlmoco) {
        const [almocoHora, almocoMin] = horaAlmoco.split(':').map(Number);
        const almocoEmMinutos = almocoHora * 60 + almocoMin;
  
        diferencaEmMinutos -= almocoEmMinutos;
      }
  
      if (diferencaEmMinutos >= 0) {
        const horas = Math.floor(diferencaEmMinutos / 60);
        const minutos = diferencaEmMinutos % 60;
  
        this.agenda.horaprevista = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
      } else {
        this.agenda.horaprevista = 'Horário inválido';
      }
    } else {
      this.agenda.horaprevista = '';
    }
  }
  
  extrairHorasEMinutos(horaStr: string): [number, number] {
    const match = horaStr.match(/^(\d+)h(\d+)?$/);
    if (match) {
      const horas = parseInt(match[1], 10);
      const minutos = match[2] ? parseInt(match[2], 10) : 0;
      return [horas, minutos];
    }
    return [0, 0];
  }
  
  ngOnInit() {
    this.gerarDiasSemana();
    this.construirCalendario();
    const hoje = this.dataAtual.toISOString().split('T')[0];
    this.agenda.usuariocriacao = localStorage.getItem('user')!;
    this.carregarAgendas();
  }

  gerarDiasSemana() {
    const formatoDia = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
    const referencia = new Date(Date.UTC(2023, 0, 1));
    this.diasSemana = Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(referencia.getTime());
      dia.setDate(referencia.getDate() + i);
      return formatoDia.format(dia);
    });
  }

  construirCalendario() {
    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiaDaSemana = 0;
    const ultimoDiaDaSemana = 6;

    const dataInicial = new Date(ano, mes, 1);
    while (dataInicial.getDay() !== primeiroDiaDaSemana) {
      dataInicial.setDate(dataInicial.getDate() - 1);
    }

    const dataFinal = new Date(ano, mes + 1, 0);
    while (dataFinal.getDay() !== ultimoDiaDaSemana) {
      dataFinal.setDate(dataFinal.getDate() + 1);
    }

    this.diasCalendario = [];
    for (
      let data = new Date(dataInicial.getTime());
      data <= dataFinal;
      data.setDate(data.getDate() + 1)
    ) {
      this.diasCalendario.push(new Date(data.getTime()));
    }
  }

  isDiaDesabilitado(dia: Date): boolean {
    return dia.getMonth() !== this.dataAtual.getMonth();
  }

onDiaClick(dia: Date): void {
  this.dataModal = dia.toISOString().split('T')[0];
  this.agenda = {
    data: this.dataModal,
    atividade: '',
    idagenda: '',
    horainicio: '',
    horafinal: '',
    horaalmoco: '',
    horaprevista: '',
    horarealizada: '',
    empresaTrabalhada: '',
    status: 0,
    usuariocriacao: '',
  };
  if (!dia || isNaN(dia.getTime())) {
    console.error('Data inválida ao clicar no dia:', dia);
    return;
  }

  const dataSelecionada = dia.toISOString().split('T')[0];
  this.carregarAgendasModal(dataSelecionada);
  this.mostrarModal = true;
}

fecharModal(): void {
  this.mostrarModal = false;
  this.carregarAgendas();
  this.limparCamposFormulario();
  this.event = 'Cadastrar'; 
}

  obterAgendasDoDia(dia: Date): any[] {
    const dataFiltrada = dia.toISOString().split('T')[0];
    return this.agendas.filter((agenda: any) => agenda.DATA === dataFiltrada);
  }

getAgendasDoDia(dia: Date): any[] {
  if (!dia || isNaN(dia.getTime())) {
    console.error('Data inválida ao tentar obter agendas para o dia:', dia);
    return [];
  }

  return this.todasAsAgendas.filter(agenda =>
    new Date(agenda.DATA).toISOString().split('T')[0] === dia.toISOString().split('T')[0]
  );
}

// }// Função para carregar todas as agendas (calendário)
// carregarAgendas(): void {
//   this.agendaService.getAgendasByUser(this.agenda.usuariocriacao).subscribe(
//     (agendas: any[]) => {
//       console.log('Agendas recebidas:', agendas);
//       this.todasAsAgendas = agendas; // Armazenar todas as agendas para exibição no calendário
//       console.log('Todas as agendas carregadas:', this.todasAsAgendas);
//     },
//     (error: any) => {
//       console.error('Erro ao carregar agendas:', error);
//       this.todasAsAgendas = [];
//     }
//   );
// }
carregarAgendas(): void {
  const usuarioCriacao = this.agenda.usuariocriacao; // Pegando o usuário da agenda
  console.log('Carregando agendas para o usuário:', usuarioCriacao);

  if (!usuarioCriacao) {
      console.error('Usuário de criação não definido.');
      return; // Adicione uma verificação para evitar chamadas desnecessárias
  }

  this.agendaService.getAgendasByUsuarioCriacao(usuarioCriacao).subscribe(
      (agendas: Agenda[]) => {
          console.log('Agendas carregadas com sucesso:', agendas);
          this.todasAsAgendas = agendas; // Armazenando as agendas no componente
      },
      (error: any) => {
          console.error('Erro ao carregar agendas:', error);
          this.todasAsAgendas = [];
      }
  );
}


// Função para filtrar as agendas do dia selecionado (modal)
carregarAgendasModal(dataSelecionada: string): void {
  const dataFiltrada = new Date(dataSelecionada).toISOString().split('T')[0];
  this.agendasDoDiaModal = this.todasAsAgendas.filter(agenda =>
    new Date(agenda.DATA).toISOString().split('T')[0] === dataFiltrada
  );
  console.log('Agendas do dia:', this.agendasDoDiaModal);
}

alterarMes(incremento: number): void {
  this.dataAtual.setMonth(this.dataAtual.getMonth() + incremento);
  this.dataAtual = new Date(this.dataAtual.getTime());
  // Atualiza o calendário chamando a função que carrega as agendas
  this.carregarAgendas();
  this.construirCalendario();
}
}