export interface TarefaStatus{
    idstatus?: number,
    titulo: string,
    descricao: string,
    ativo: number,
    concluido: number,
    cancelado: number,
    datacriacao: string,
    dataalteracao: string,
    usuariocriacao: string,
    usuarioalteracao: string,
    atarefastatuscol: string
}
export type CreateTarefaStatus = Omit<TarefaStatus,"idstatus">;