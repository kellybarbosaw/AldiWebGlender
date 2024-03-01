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

  public user = {
    isloggedIn: false,
    name: '',
    perfil: ''
  }



  constructor(private httpClient: HttpClient, private router: Router ) {
  }

  ngOnInit(){
  }

  login(user: Login) {
    this.clearValidate();
    return this.httpClient.post<Login>(this.url, user)
  }

  saveValidate(data: any) {


    this.mensagem = data.msg;
    this.token = data.authorization;
    this.user.name = data.user;
    this.user.perfil = data.perfil;
    this.user.isloggedIn = true;

    localStorage.setItem('authorization-token-access', this.token);
    localStorage.setItem('user', this.user.name);
    localStorage.setItem('perfil', this.user.perfil);
    localStorage.setItem('isloggedIn', this.user.isloggedIn.toString());



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
    }, 1200000);
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
