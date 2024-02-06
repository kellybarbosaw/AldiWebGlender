import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contract, CreateContract } from '../models/contract.model';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private url = `${environment.api}/contract`;
  private urlproject = `${environment.api}/project/contract`;

  constructor(private httpClient: HttpClient) { }

  registerContract(newContract: CreateContract) {
    return this.httpClient.post<CreateContract>(this.url, newContract)
  }

  contractCurrent(id: number){
    return this.httpClient.get<Contract[]>(`${this.url}/${id}`) 
  }

  editContract(contract:CreateContract){
    console.log(contract)
    return this.httpClient.put<CreateContract>(this.url, contract)
  }

  deleteContract(id:number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  projectsClient(id:number){
    return this.httpClient.get<Project[]>(`${this.urlproject}/${id}`) 
  }
}
