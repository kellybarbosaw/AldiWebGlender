import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormatsService } from '../../services/formats.service';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './pessoa.component.html',
  styleUrl: './pessoa.component.scss',
})
export class PessoaComponent {
  pessoa = {
    idpessoa: '',
    nome: '',
    cpf: '',
    dtnascimento: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    naturalidade: '',
    nacionalidade: '',
    usuario: '',
    nroidentidade: '',
    orgaoemissorident: '',
    estadoemissorident: '',
    zusuario_usuario: '',
  };

  event = 'Cadastrar';

  constructor(private formatService: FormatsService,private pessoaService: PessoaService,private router: Router,private route: ActivatedRoute
  ) {
    this.pessoa.idpessoa = this.route.snapshot.params['id'];

    if (this.route.snapshot.params['id'] === undefined) {
      this.event = 'Cadastrar';
    } else {
      this.pessoaService
        .pessoaCurrent(this.route.snapshot.params['id'])
        .subscribe((datas: any) => {
          const data = datas[0];
          (this.pessoa.nome = data.NOME),
            (this.pessoa.cpf = data.CPF),
            (this.pessoa.dtnascimento = data.DTNASCIMENTO),
            (this.pessoa.rua = data.RUA),
            (this.pessoa.numero = data.NUMERO),
            (this.pessoa.complemento = data.COMPLEMENTO),
            (this.pessoa.bairro = data.BAIRRO),
            (this.pessoa.naturalidade = data.NATURALIDADE),
            (this.pessoa.nacionalidade = data.NACIONALIDADE),
            (this.pessoa.usuario = data.USUARIO),
            (this.pessoa.nroidentidade = data.NROIDENTIDADE),
            (this.pessoa.orgaoemissorident = data.ORGAOEMISSORIDENT),
            (this.pessoa.estadoemissorident = data.ESTADOEMISSORIDENT),
            (this.pessoa.zusuario_usuario = data.ZUSUARIO_USUARIO);

            this.pessoa.dtnascimento = this.formatService.formatDate(data.DTNASCIMENTO!);
        });
      this.event = 'Editar';
    }
  }
  registerPessoa() {
    //VALIDAÇÃO DE CAMPOS PREENCHIDOS
    if (
      !this.pessoa.nome ||
      !this.pessoa.cpf ||
      !this.pessoa.dtnascimento ||
      !this.pessoa.rua ||
      !this.pessoa.numero ||
      !this.pessoa.complemento ||
      !this.pessoa.bairro ||
      !this.pessoa.naturalidade ||
      !this.pessoa.nacionalidade ||
      !this.pessoa.usuario ||
      !this.pessoa.nroidentidade ||
      !this.pessoa.orgaoemissorident ||
      !this.pessoa.estadoemissorident ||
      !this.pessoa.zusuario_usuario
    ) {
      alert('preencha os campos');
      console.log(this.pessoa);
      return;
    } else {
      alert('Formulário enviado!');
      console.log(this.pessoa);
    }

    //VERIFICAÇÃO DE EVENTO DO BOTÃO
    if (this.event === 'Cadastrar') {
      this.pessoaService
        .registerPessoa({
          nome: this.pessoa.nome,
          cpf: this.pessoa.cpf,
          dtnascimento: this.pessoa.dtnascimento,
          rua: this.pessoa.rua,
          numero: this.pessoa.numero,
          complemento: this.pessoa.complemento,
          bairro: this.pessoa.bairro,
          naturalidade: this.pessoa.naturalidade,
          nacionalidade: this.pessoa.nacionalidade,
          usuario: this.pessoa.usuario,
          nroidentidade: this.pessoa.nroidentidade,
          orgaoemissorident: this.pessoa.orgaoemissorident,
          estadoemissorident: this.pessoa.estadoemissorident,
          zusuario_usuario: this.pessoa.zusuario_usuario,
        })
        .subscribe(() => {
          this.router.navigate(['/user/pessoa']);
        });
    } else if (this.event === 'Editar') {
      console.log('editando');

      this.pessoaService
        .editPessoa({
          idpessoa: this.pessoa.idpessoa,
          nome: this.pessoa.nome,
          cpf: this.pessoa.cpf,
          dtnascimento: this.pessoa.dtnascimento,
          rua: this.pessoa.rua,
          numero: this.pessoa.numero,
          complemento: this.pessoa.complemento,
          bairro: this.pessoa.bairro,
          naturalidade: this.pessoa.naturalidade,
          nacionalidade: this.pessoa.nacionalidade,
          usuario: this.pessoa.usuario,
          nroidentidade: this.pessoa.nroidentidade,
          orgaoemissorident: this.pessoa.orgaoemissorident,
          estadoemissorident: this.pessoa.estadoemissorident,
          zusuario_usuario: this.pessoa.zusuario_usuario
        })
        .subscribe((data: any) => {
          console.log(data);
          this.router.navigate(['/user/pessoa']);
        });
    } else {
      alert('Error!');
    }
  }

  stage = 1;
  mudarEtapa(stage: number) {
    this.stage = stage;
    let element1 = document.querySelector('.stage_1') as HTMLLIElement;
    let element2 = document.querySelector('.stage_2') as HTMLLIElement;
    let element3 = document.querySelector('.stage_3') as HTMLLIElement;

    switch (stage) {
      case 1:
        element1.classList.add('current');
        element2.classList.remove('current');
        element3.classList.remove('current');

        break;
      case 2:
        element1.classList.remove('current');
        element2.classList.add('current');
        element3.classList.remove('current');
        break;
      case 3:
        element1.classList.remove('current');
        element2.classList.remove('current');
        element3.classList.add('current');
        break;

      default:
        break;
    }
  }
}