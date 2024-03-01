export interface Pessoas {
    IDPESSOA?: number;
    NOME: string;
    CPF: string;
    DTNASCIMENTO: string;
    RUA: string;
    NUMERO: string;
    COMPLEMENTO: string;
    BAIRRO: string;
    NATURALIDADE: string;
    NACIONALIDADE: string;
    USUARIO: string;
    NROIDENTIDADE: string;
    ORGAOEMISSORIDENT: string;
    ESTADOEMISSORIDENT: string;
    ZUSUARIO_USUARIO: string;
    }

export interface Pessoa {
    idpessoa?: number;
    nome: string;
    cpf: string;
    dtnascimento: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    naturalidade: string;
    nacionalidade: string;
    usuario: string;
    nroidentidade: string;
    orgaoemissorident: string;
    estadoemissorident: string;
    zusuario_usuario: string;
    }

    export type CreatePessoa = Omit<Pessoa, 'idpessoa'>;