import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private url = `${environment.api}/contract`;

  constructor(private httpClient: HttpClient) { }

  registerContract(newContract: Contract) {
    return this.httpClient.post<Contract>(this.url, newContract)
  }

  contractCurrent(id: number){
    return this.httpClient.get<Contract[]>(`${this.url}/${id}`) 
  }

  editContract(contract:Contract){
    return this.httpClient.put<Contract>(this.url, contract)
  }

  deleteContract(id:string){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }
}
