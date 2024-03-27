import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contract, CreateContract } from '../models/contract.model';
import { Project } from '../models/project.model';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private url = `${environment.api}/contract`;
  private urlproject = `${environment.api}/project/contract`;

  private contractSubject = new BehaviorSubject<Contract[]>([]);
  public allContract$ = this.contractSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getContractsWithHeaders(offset: number, limit: number): Observable<{ contracts: Contract[], headers: HttpHeaders }> {
    return this.httpClient.get<Contract[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
      .pipe(
        map(response => {
          const contracts = response.body || []; // Extrai o corpo da resposta corretamente
          this.contractSubject.next(contracts);
          const headers = response.headers;
          return { contracts, headers };
        })
      );
  }

  registerContract(newContract: CreateContract) {
    return this.httpClient.post<CreateContract>(this.url, newContract)
  }

  contractCurrent(id: number){
    return this.httpClient.get<Contract[]>(`${this.url}/${id}`) 
  }

  editContract(contract:CreateContract){
    return this.httpClient.put<CreateContract>(this.url, contract)
  }

  deleteContract(id:number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  projectsContract(id:number){
    return this.httpClient.get<Project[]>(`${this.urlproject}/${id}`) 
  }
}
