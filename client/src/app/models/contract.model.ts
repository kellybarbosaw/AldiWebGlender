
export interface Contract{
    idvenda?: number,
    idcliente: number,
    descricaovenda: string,
    statusvenda: string,
    idprojeto?: number,
    comercialvenda: string,

    dtcontato: string,
    dtcontrato: string,
    dtassinatura: string,
    dtconclusao: string,
    dtcriacao: string,
    dtalteracao: string,

    usuariocriacao: string,
    usuarioalteracao: string
}