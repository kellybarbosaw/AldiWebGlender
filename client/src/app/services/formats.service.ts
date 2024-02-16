import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatsService {

  constructor() { }

  formatTime(time: string, id: string){
    function formatMes(i:number){
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

    function formatDay(day:number){
      if(day < 10) return `0${day}`
      else return day
    }

    var date = new Date(time)
    var dia = formatDay(date.getDate());
    var mes = formatMes(date.getMonth());
    var ano = date.getFullYear();
    var dateFormat = `${ano}-${mes}-${dia}`

    var dataInicioProjeto = document.getElementById(id) as HTMLInputElement;

    setTimeout(() => {
      if (typeof document !== 'undefined') {
        dataInicioProjeto.value = dateFormat
      }
    }, 100);

    return dateFormat;
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

  }
}
