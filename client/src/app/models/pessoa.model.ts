export interface Pessoas {
    IDPESSOA?: number,
    NOME: string,
    CPF: string,
    DTNASCIMENTO: string,
    RUA: string,
    NUMERO: string,
    COMPLEMENTO: string,
    BAIRRO: string,
    NATURALIDADE: string,
    NACIONALIDADE: string,
    USUARIO: string,
    NROIDENTIDADE: string,
    ORGAOEMISSORIDENT: string,
    ESTADOEMISSORIDENT: string,
    ZUSUARIO_USUARIO: string,
    DTCRIACAO :string,
    DTALTERACAO :string,
    USUARIOCRIACAO :string,
    USUARIOALTERACAO:string
    }

export interface Pessoa {
    idpessoa?: number,
    nome: string,
    cpf: string,
    dtnascimento: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    naturalidade: string,
    nacionalidade: string,
    usuario: string,
    nroidentidade: string,
    orgaoemissorident: string,
    estadoemissorident: string,
    zusuario_usuario: string,
    dtcriacao :string,
    dtalteracao :string,
    usuariocriacao :string,
    usuarioalteracao :string
    }

    export type CreatePessoa = Omit<Pessoa, 'idpessoa'>;