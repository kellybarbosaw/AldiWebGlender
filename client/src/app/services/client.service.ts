import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client, CreateClient } from '../models/client.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private url = `${environment.api}/client`;

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  registerClient(newClient: CreateClient) {
    return this.httpClient.post<CreateClient>(this.url, newClient)
  }

  allClients(){
    return this.httpClient.get<Client[]>(this.url)
  }

  clientCurrent(id:String){
    return this.httpClient.get<Client[]>(`${this.url}/${id}`)    
  }

  editClient(client:CreateClient){
    return this.httpClient.put<Client>(this.url, client)
  }

  deleteClient(id:number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

}
