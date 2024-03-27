import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User,CreateUser } from "../models/users.model";
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private userSubject = new BehaviorSubject<User[]>([]);
  public allUsers$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }
  private url = `${environment.api}/user`;
  

  getUsersWithHeaders(offset: number, limit: number): Observable<{ usuarios: User[], headers: HttpHeaders }> {
    return this.httpClient.get<User[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
      .pipe(
        map(response => {
          const usuarios = response.body || []; // Extrai o corpo da resposta corretamente
          this.userSubject.next(usuarios);
          const headers = response.headers;
          return { usuarios, headers };
        })
      );
  }

  registerUser(newUser: CreateUser) {
    return this.httpClient.post<CreateUser>(`${this.url}/register`, newUser)
  }

  userCurrent(user:String){
    return this.httpClient.get<User[]>(`${this.url}/${user}`)    
  }

  editUser(user:CreateUser){
    return this.httpClient.put<User>(this.url, user)
  }

  deleteUser(user:string){
    return this.httpClient.delete<void>(`${this.url}/${user}`)
  }
}
