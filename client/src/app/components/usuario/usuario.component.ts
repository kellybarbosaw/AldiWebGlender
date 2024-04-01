import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatsService } from '../../services/formats.service';
import { UsuariosService } from '../../services/usuarios.service';
import { MensageriaService } from '../../services/mensageria.service';
import { Subject, catchError, of } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  error$ = new Subject<boolean>();


  User = {
    usuario: '',
    nome: '',
    ativo: 2,
    perfil: 'padrão',
    datacriacao: '',
    dataalteracao: '',
    usuariocriacao: '',
    usuarioalteracao: '',
    senha: 'senha',
    email: '',
  }
  dadosFicticios = {
    dtcriacao: '2024-01-29 12:26:00',
    dtmodificacao: '2024-01-29 12:26:00',
    usuariocriacao: 'usuario teste criacao',
    usuarioalteracao: 'usuario teste alteracao',
  }
  event = "Cadastrar"

  constructor(
    private usuarioService: UsuariosService, 
    private router: Router, 
    private route: ActivatedRoute,
    private formatService: FormatsService,
    private messageriaService: MensageriaService,
    private loginService: LoginService
    ) {

    if (this.route.snapshot.params['event'] === "new") {
      this.event = "Cadastrar"
    } else {

      this.usuarioService.userCurrent(this.route.snapshot.params['user'])
        .subscribe((datas) => {
          const data = datas[0];
            this.User.usuario = data.USUARIO,
            this.User.nome = data.NOME,
            this.User.ativo = data.ATIVO,
            this.User.perfil = data.PERFIL,
            this.User.datacriacao = this.formatService.format(data.DATACRIACAO!,"datacriacao","dateTime"),
            this.User.dataalteracao = this.formatService.format(data.DATAALTERACAO!,"dataalteracao","dateTime"),
            this.User.usuariocriacao = data.USUARIOCRIACAO,
            this.User.usuarioalteracao = data.USUARIOALTERACAO,
            this.User.email = data.EMAIL
        })
      this.event = "Editar"

    }
  }


  registerUser() {
    if (this.event === 'Cadastrar') {

      this.User.datacriacao = this.formatService.dateNow(),
      this.User.dataalteracao = this.formatService.dateNow(),
      this.User.usuariocriacao = localStorage.getItem('user')!,
      this.User.usuarioalteracao = localStorage.getItem('user')!


      this.usuarioService.registerUser({
        usuario: this.User.usuario,
        nome: this.User.nome,
        ativo: this.User.ativo,
        perfil: this.User.perfil,
        datacriacao: this.User.datacriacao,
        dataalteracao: this.User.dataalteracao,
        usuariocriacao: this.User.usuariocriacao,
        usuarioalteracao: this.User.usuarioalteracao,
        senha: this.User.senha,
        email: this.User.email,
      }).pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      ).subscribe(() => { 
        this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Realizado Com Sucesso!', 'messages', 'success')
        this.router.navigate([`/user/usuarios`]) 
      })

    }else if (this.event === 'Editar') {
      alert("editar")
      this.User.dataalteracao = this.formatService.dateNow(),
      this.User.usuarioalteracao = localStorage.getItem('user')!

      this.usuarioService.editUser(this.User).pipe(
        catchError(err => {
          this.messageriaService.messagesRequest('Ocorreu um Error', err.error.message, 'messages', 'danger')
          this.error$.next(true)
          if (err.statusText === "Unauthorized") {
            alert("Seu iToken foi expirado! Realize o login novamente")
            this.loginService.deslogar();
          }
          return of();
        })
      ).subscribe(()=>{
        this.messageriaService.messagesRequest('Sucesso!', 'Cadastro Editado Com Sucesso!', 'messages', 'success')
        this.router.navigate([`/user/usuarios`]) 
      })

    } else {
      alert('algo deu errado')
    }
  }

}
