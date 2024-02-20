export interface Apontamento{

    idapontamento?: number,
    idprojetotarefa: number,
    data: string,
    horainicio : string,
    horafinal : string,
    descricao : string,
    dtcriacao : string,
    dtmodificacao : string,
    usuariocriacao : string,
    usuarioalteracao : string
    }
    
export type CreateApontamento = Omit<Apontamento,"idapontamento">;