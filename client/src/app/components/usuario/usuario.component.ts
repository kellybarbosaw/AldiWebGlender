import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

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

  constructor(private usuarioService: UsuariosService, private router: Router, private route: ActivatedRoute) {

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
            this.User.datacriacao = data.DATACRIACAO,
            this.User.dataalteracao = data.DATAALTERACAO,
            this.User.usuariocriacao = data.USUARIOCRIACAO,
            this.User.usuarioalteracao = data.USUARIOALTERACAO,
            this.User.senha = data.SENHA,
            this.User.email = data.EMAIL
        })
      this.event = "Editar"

    }
  }


  registerUser() {
    if (this.event === 'Cadastrar') {

      this.User.datacriacao = this.dadosFicticios.dtcriacao,
      this.User.dataalteracao = this.dadosFicticios.dtmodificacao,
      this.User.usuariocriacao = this.dadosFicticios.usuariocriacao,
      this.User.usuarioalteracao = this.dadosFicticios.usuarioalteracao

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
      }).subscribe((data) => { this.router.navigate([`/user/usuarios`]) })

    }else if (this.event === 'Editar') {
      alert("editar")
      this.User.datacriacao = this.dadosFicticios.dtcriacao,
      this.User.dataalteracao = this.dadosFicticios.dtmodificacao,
      this.User.usuariocriacao = this.dadosFicticios.usuariocriacao,
      this.User.usuarioalteracao = this.dadosFicticios.usuarioalteracao

      
      this.usuarioService.editUser(this.User).subscribe(()=>{
        this.router.navigate([`/user/usuarios`]) 
      })

    } else {
      alert('algo deu errado')
    }
  }

}
