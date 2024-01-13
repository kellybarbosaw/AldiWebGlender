import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client, CreateClient } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  private url = `${environment.api}/client`;

  constructor(private httpClient: HttpClient) { }

  registerClient(newClient: CreateClient) {
    return this.httpClient.post<CreateClient>(this.url, newClient)
  }

  allClients(){
    return this.httpClient.get<Client[]>(this.url)
  }

  clientCurrent(id:String){
    return this.httpClient.get<Client[]>(`${this.url}/${id}`)    
  }

  editClient(client:Client){
    console.log(client)
    return this.httpClient.put<Client>(this.url, client)
  }

  deleteClient(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

}
