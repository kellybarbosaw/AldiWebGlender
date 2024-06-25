import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project, CreateProject } from '../models/project.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = `${environment.api}/project`;
  public qtdProjetos: number | null = 0;
  private ProjetosSubject = new BehaviorSubject<Project[]>([]);
  public allProjeto$ = this.ProjetosSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  registerProject(newProject: CreateProject) {
    return this.httpClient.post<CreateProject>(this.url, newProject)
  }

  getProjectsWithHeaders(offset: number, limit: number): Observable<{ projetos: Project[], headers: HttpHeaders }> {
    return this.httpClient.get<Project[]>(`${this.url}/?offset=${offset}&limit=${limit}`, { observe: 'response' })
      .pipe(
        map(response => {
          const projetos = response.body || []; // Extrai o corpo da resposta corretamente
          this.ProjetosSubject.next(projetos);
          const headers = response.headers;
          return { projetos, headers };
        })
      );
  }

  allProjects(){
    return this.httpClient.get<Project[]>(`${this.url}`) 
  }


  projectCurrent(id: Number){
    return this.httpClient.get<Project[]>(`${this.url}/${id}`) 
  }

  projectsWithClients(id: Number){
    return this.httpClient.get<Project[]>(`${this.url}/client/${id}`) 
  }

  editProject(project:CreateProject){
    return this.httpClient.put<CreateProject>(this.url, project)
  }

  deleteProject(id:Number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  clientProject(dados:any){
    return this.httpClient.get<any>(`${this.url}/client`);
  }

  tarefaProject(dados:any){
    return this.httpClient.get<any>(`${this.url}/tarefa`);
  }

  contratoProject(dados:any){
    return this.httpClient.get<any>(`${this.url}/contrato`);
  }

  projetoTarefaProject(dados:any){
    return this.httpClient.get<any>(`${this.url}/projetoTarefa`);
  }

  selectContrato(){
    return this.httpClient.get<any>(this.url);
  }
}
