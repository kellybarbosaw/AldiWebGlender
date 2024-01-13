import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model';
import { Router} from '@angular/router'
import { access } from 'fs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = `${environment.api}/user/login`;

  constructor(private httpClient: HttpClient, private router:Router) { }

  login(user: Login) {
    return this.httpClient.post<Login>(this.url, user)
  }

  validate(data:any){
    
    var mensagem = data.msg;
    var token = data.authorization;



    localStorage.setItem('authorization-token-access', token);
     
    console.log("direcionar para tela de cadastro de cliente");

    this.direcionar();
  }

  direcionar(){

    this.router.navigate(['/user'])
  }
}
