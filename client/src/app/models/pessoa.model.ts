export interface Pessoa {
    idpessoa?: string,
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