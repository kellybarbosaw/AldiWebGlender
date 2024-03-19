import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { User } from '../../models/users.model';
import { UsuariosService } from "../../services/usuarios.service";
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  error$ = new Subject<boolean>();
  allUsers$ = new Observable<User[]>();

  offset = 0;
  limit = 5;
  paginaAtual = 1;
  paginas:number[] = [];
  qtdUsuarios = 0;
  qtdMostrado = 5;

  constructor(
    private usuariosService:UsuariosService, 
    private router: Router,
    private loginService: LoginService){
  }
  ngOnInit() {
    this.paginas = [];
    this.usuariosService.getUsersWithHeaders(this.offset, this.limit).pipe(
      catchError(err => {
        this.error$.next(true)
        if (err.statusText === "Unauthorized") {
          alert("Seu iToken foi expirado! Realize o login novamente")
          this.loginService.deslogar();
        }
        return of();
      })
    ).subscribe({
      next: (result) => {        
        this.allUsers$ = this.usuariosService.allUsers$;
        this.qtdUsuarios = parseInt(result.headers?.get('Quantidades_Registros')!);

        for (let index = 1; index <= Math.ceil(this.qtdUsuarios/this.limit) ; index++) {
          this.paginas.push(index);
        }
        if(this.qtdMostrado > this.qtdUsuarios) this.qtdMostrado = this.qtdUsuarios

      },
      error: (error) => {
        console.error('Houve um erro ao obter os clientes:', error);
      }
    });
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
    ).subscribe(()=>{this.ngOnInit()})
  }

  buscar() {
    this.offset = 0;
    this.paginar(1)
  }

  paginar(pagina: number) {
    this.paginaAtual = pagina;
    let of = pagina - 1
    this.offset = (of * this.limit);
    this.qtdMostrado = (pagina*this.limit)
    if(this.qtdMostrado > this.qtdUsuarios) this.qtdMostrado = this.qtdUsuarios
    this.ngOnInit()
  }

  passar(type:string){
    switch (type) {
      case 'next':
        if(this.paginaAtual >= this.paginas.length)return
        this.paginaAtual += 1;
        this.paginar(this.paginaAtual)     
        break;
      case 'back':
        if(this.paginaAtual === 1)return
        this.paginaAtual -= 1;
        this.paginar(this.paginaAtual)
        break;
    }
  }


}
