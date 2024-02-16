import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';

//teste requisições
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, JwtModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // private url = `${environment.api}/user/login`;

  constructor() {

    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: this.jwtOptionsFactory
    //   }
    // })


    // console.log("rodando api da porta: " + environment.api);
  }

  // jwtOptionsFactory() {
  //   return {
  //     tokenGetter: () => {
  //       // Implemente aqui a lógica para obter o token do usuário autenticado
  //       return localStorage.getItem('authorization-token-access');
  //     },
  //     whitelistedDomains: [environment.api],
  //     blacklistedRoutes: [this.url]
  //   }
  // }
}
