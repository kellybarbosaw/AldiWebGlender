
export interface Contract{
    IDVENDA?: number,
    IDCLIENTE: number,
    DESCRICAOVENDA: string,
    STATUSVENDA: string,
    IDPROJETO?: number,
    COMERCIALVENDAcol: string,

    DTCONTATO: string,
    DTCONTRATO: string,
    DTASSINATURA: string,
    DTCONCLUSAO: string,
    DATACRIACAO: string,
    DATAALTERACAO: string,

    USUARIOCRIACAO: string,
    USUARIOALTERACAO: string,
    NOMECLIENTE: string
}
export interface CreateContract{
    idvenda?: number,
    idcliente: number,
    descricaovenda: string,
    statusvenda: string,
    idprojeto?: number,
    comercialvendacol: string,

    dtcontato: string,
    dtcontrato: string,
    dtassinatura: string,
    dtconclusao: string,
    dtcriacao: string,
    dtalteracao: string,

    usuariocriacao: string,
    usuarioalteracao: string
}