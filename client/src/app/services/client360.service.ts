import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class Client360Service {

  private urlclient = `${environment.api}/client`;
  private urlcontract = `${environment.api}/contract/client`;

  constructor(private httpClient: HttpClient) { }


  clientCurrent(id:String){
    return this.httpClient.get<Client[]>(`${this.urlclient}/${id}`)    
  }

  contractsClient(id:number){
    return this.httpClient.get<Contract[]>(`${this.urlcontract}/${id}`) 
  }
}
