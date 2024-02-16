import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model';
import { Router } from '@angular/router'

//teste requisições
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';




@Injectable({
  providedIn: 'root',
  
})
export class LoginService {

  private url = `${environment.api}/user/login`;
  private mensagem = '';
  private token = '';

  public isloggedIn = false;
  public name = '';
  public perfil = '';



  constructor(private httpClient: HttpClient, private router: Router ) {}

  login(user: Login) {
    this.clearValidate();
    return this.httpClient.post<Login>(this.url, user)
  }

  saveValidate(data: any) {

    this.mensagem = data.msg;
    this.token = data.authorization;
    this.name = data.user;
    this.perfil = data.perfil;

    localStorage.setItem('authorization-token-access', this.token);


    this.deslogarTime();
    this.direcionar();
  }

  validate() {
    if (typeof localStorage !== 'undefined') {
      // alert("teste NG ONinit")
      return !!localStorage.getItem('authorization-token-access');
    }
    return false
  }

  validateData() {
  }

  clearValidate() {
    localStorage.clear();
  }

  deslogar(){
    this.clearValidate();
    this.router.navigate(['/login'])
  }

  deslogarTime(){ 
    setTimeout(() => {
      this.deslogar();
    }, 30000);
  }

  direcionar() {
    if (this.validate()) {
      this.router.navigate(['/user'])
    } else {
      alert("erro de login")
    }
  }

  // constructorHeadres(){
  //   const token = localStorage.getItem('authorization-token-access');
  //   const _headers = new HttpHeaders({'authorization': token!});
  //   return _headers
  // }
}
