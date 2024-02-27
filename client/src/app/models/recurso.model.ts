export interface Recurso{

    idrecurso?: number,
    idpessoa?: number,
    tiporecurso: number,
    datainicio: string,
    datafim: string,
    datacriacao: string,
    dataalteracao: string,
    usuariocriacao: string,
    usuarioalteracao: string,
    ativo: number,
    valorhr: number,
    nomepessoa: string
    
    }
    
    export type CreateRecurso = Omit<Recurso,"idrecurso">;