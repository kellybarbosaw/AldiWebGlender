import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pessoas } from '../../models/pessoa.model';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgxMaskPipe],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent {

  error$ = new Subject<boolean>();

  allPessoa$ = new Observable<Pessoas[]>();

  constructor(private pessoaService: PessoaService, private loginService: LoginService){
    setTimeout(() => {

      this.allPessoa$ = this.pessoaService.allPessoa()
        .pipe(
          catchError(err => {
            this.error$.next(true)
            if (err.statusText === "Unauthorized") {
              alert("Seu iToken foi expirado! Realize o login novamente")
              this.loginService.deslogar();
            }
            return of();
          })
        );

    }, 1000);
    // this.error$.next(true)

  }

  event = "Excluir";
  deletPessoa(id: number) {
    console.log("teste");
    console.log(id);
    //alert("deseja realmente deletar esse item?" + id);
    this.pessoaService.deletePessoa(id).pipe(

      catchError(err => {
        alert(err.error.msg)
        return of();
      })
    ).subscribe(() => { this.allPessoa$ = this.pessoaService.allPessoa() })
  }

    
  }