export interface TarefaStatus{
    idstatus?: number,
    titulo: string,
    descricao: string,
    datacriacao: string,
    dataalteracao: string,
    usuariocriacao: string,
    usuarioalteracao: string,
    status: number
}
export type CreateTarefaStatus = Omit<TarefaStatus,"idstatus">;