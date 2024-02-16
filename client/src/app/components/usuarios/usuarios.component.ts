import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../../models/users.model';
import { UsuariosService } from "../../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  allUsers$ = new Observable<User[]>();

  constructor(private usuariosService:UsuariosService, private router: Router){

    this.allUsers$ = usuariosService.allUsers();
  }

  editUser(user: User){
    this.router.navigate([`/user/usuario/edit/${user.USUARIO}`]);
  }

  deletUser(usuario: string){
    alert("deseja realmente deletar esse iten?" + usuario);
    this.usuariosService.deleteUser(usuario).pipe(
      catchError(err => {
        alert(err.statusText)
        return of();
      })
    ).subscribe(()=>{this.allUsers$ = this.usuariosService.allUsers()})
  }


}
