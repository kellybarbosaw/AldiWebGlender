import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User,CreateUser } from "../models/users.model";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }
  private url = `${environment.api}/user`;
  

  allUsers(){
    return this.httpClient.get<User[]>(this.url)
  }

  registerUser(newUser: CreateUser) {
    console.log(newUser);
    return this.httpClient.post<CreateUser>(`${this.url}/register`, newUser)
  }

  userCurrent(user:String){
    return this.httpClient.get<User[]>(`${this.url}/${user}`)    
  }

  editUser(user:CreateUser){
    console.log(user);

    return this.httpClient.put<User>(this.url, user)
  }

  deleteUser(user:string){
    console.log(user)
    return this.httpClient.delete<void>(`${this.url}/${user}`)
  }
}
