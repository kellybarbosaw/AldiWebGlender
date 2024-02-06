export interface User{
    USUARIO: string,
    NOME: string,
    ATIVO: number,
    PERFIL: string,
    DATACRIACAO: string,
    DATAALTERACAO:string,
    USUARIOCRIACAO:string,
    USUARIOALTERACAO:string,
    SENHA:string,
    EMAIL:string,

}
export interface CreateUser{
    usuario: string,
    nome: string,
    ativo: number,
    perfil: string,
    datacriacao: string,
    dataalteracao:string,
    usuariocriacao:string,
    usuarioalteracao:string,
    senha:string,
    email:string,
}
