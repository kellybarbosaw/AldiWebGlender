import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Login } from '../../models/login.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = ''
  password = ''

  constructor(private loginService: LoginService) { }

  login() {
    if (!this.password || !this.password) {
      alert("preencha os campos");
      return;
    }

    this.loginService.login({ email: this.username, senha: this.password })
      .subscribe((data) => { this.loginService.saveValidate(data)})

  }



}
