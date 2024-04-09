import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensageriaService {

  constructor() { }

    messagesRequest(title:string,msg:string,id:string,type:string){
      let message = document.getElementById(id) as HTMLLIElement
      message.innerHTML += `
      <div class="alert alert-${type} alert-dismissible fade show messages">
        <div>${title}:</div>
        <div>${msg}</div>
        <div class="btn btn-close" data-bs-dismiss="alert"></div>
      </div>
      `
    }
}
