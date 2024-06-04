export interface Recursos{
    IDRECURSO?: number,
    IDPESSOA?: string,
    TIPORECURSO: string,
    DATAINICIO: string,
    DATAFIM: string,
    DATACRIACAO: string,
    DATAALTERACAO: string,
    USUARIOCRIACAO: string,
    USUARIOALTERACAO: string,
    ATIVO: number,
    VALORHR: number,
    IDTIPO?: number,
    DESCRICAO: string,
    NOME:string
    }

export interface Recurso{
    idrecurso?: number,
    idpessoa?: string,
    tiporecurso: string,
    datainicio: string,
    datafim: string,
    datacriacao: string,
    dataalteracao: string,
    usuariocriacao: string,
    usuarioalteracao: string,
    ativo: number,
    valorhr: number
    }
    
    export type CreateRecurso = Omit<Recurso,"idrecurso">;