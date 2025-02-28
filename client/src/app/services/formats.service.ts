import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatsService {

  constructor() { }

  format(time: string, id: string | null, type: string) {
    if(time === null) return ''
    var dateTimeFormat = '';
    switch (type) {
      case 'date':
        dateTimeFormat = this.formatDate(time)
        break;
      case 'time':
        dateTimeFormat = this.formatTime(time)
        break;
      case 'dateTime':
        var date = this.formatDate(time);
        var time = this.formatTime(time);
        dateTimeFormat = `${date} ${time}`

        break;

      default:
        console.log("err")
        break;
    }

    if (id !== null) {
      var dataInicioProjeto = document.getElementById(id) as HTMLInputElement;
      if (typeof document !== 'undefined') {
        window.onload = () => {
          dataInicioProjeto.value = dateTimeFormat
        }
      }
    }
    return dateTimeFormat;
  };

  formatDate(time: string) {
    function formatMes(i: number) {
      switch (i) {
        case 0:
          return '01'
        case 1:
          return '02'
        case 2:
          return '03'
        case 3:
          return '04'
        case 4:
          return '05'
        case 5:
          return '06'
        case 6:
          return '07'
        case 7:
          return '08'
        case 8:
          return '09'
        case 9:
          return '10'
        case 10:
          return '12'
        case 11:
          return '12'
        default:
          return 'error'
      }
    }

    function formatDay(day: number) {
      if (day < 10) return `0${day}`
      else return day
    }

    var date = new Date(time)
    var dia = formatDay(date.getDate());
    var mes = formatMes(date.getMonth());
    var ano = date.getFullYear();
    var dateFormat = `${ano}-${mes}-${dia}`

    return dateFormat;
  };

  formatTime(time: string) {

    var date = new Date(time)
    var hora = ("0" + date.getHours()).slice(-2); // adiciona um zero à esquerda se necessário
    var minuto = ("0" + date.getMinutes()).slice(-2);
    var segundo = ("0" + date.getSeconds()).slice(-2);
    var timeFormat = `${hora}:${minuto}:${segundo}`

    return timeFormat;
  };

  ativo(ativo: number) {

    if (typeof document !== 'undefined') {
      // Manipulating the DOM here
      var checkAtivo = document.getElementById('ativo') as HTMLInputElement;
      var checkDesativo = document.getElementById('desativo') as HTMLInputElement;

      if (ativo === 1) {
        checkAtivo.checked = true;
      } else if (ativo === 2) {
        checkDesativo.checked = true;
      } else {
        checkDesativo.checked = false;
        checkAtivo.checked = false;
      }
    }
  };

  dateNow(): string {
    var date = new Date(Date.now())
    // const options = { timeZone: 'America/Sao_Paulo' };
    // const dataHoraBrasil = date.toLocaleString('pt-BR', options);

    var dateFormat = this.format(date.toString(), null, 'dateTime')

    return dateFormat
  };

  pegarUsuarioEmail(email: string): string {
    var emailArray = email.split(''); // ["o", "i"]
    let usuario = ''
    for (let element of emailArray) {
      if (element !== '@') {
        usuario += element
      } else {
        break 
      }
    }
    return usuario
  }
  
}