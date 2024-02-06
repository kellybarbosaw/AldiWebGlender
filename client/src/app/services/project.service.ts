import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project, CreateProject } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = `${environment.api}/project`;

  constructor(private httpClient: HttpClient) { }

  registerProject(newProject: CreateProject) {
    console.log(newProject);
    return this.httpClient.post<CreateProject>(this.url, newProject)
  }

  projectCurrent(id: Number){
    return this.httpClient.get<Project[]>(`${this.url}/${id}`) 
  }

  editProject(project:CreateProject){
    console.log(project);

    return this.httpClient.put<CreateProject>(this.url, project)
  }

  deleteProject(id:Number){
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

}
