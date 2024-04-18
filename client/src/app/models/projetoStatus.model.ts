export interface ProjetoStatus{
    idstatus?: number,
    titulo: string,
    descricao: string,
    datacriacao: string,
    dataalteracao: string,
    usuariocriacao: string,
    usuarioalteracao: string,
    status: number
}
export type CreateProjetoStatus = Omit<ProjetoStatus,"idstatus">;