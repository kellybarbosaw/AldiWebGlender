export interface Tarefas {

    IDTAREFA?: number,
    TITULOTAREFA: string,
    DESCRICAOTAREFA: string,
    HORASESTIMADAS : string,
    DATACRIACAO : string,
    DATAALTERACAO : string,
    USUARIOCRIACAO : string,
    USUARIOALTERACAO : string
    }


export interface Tarefa {

    idtarefa?: string,
    titulotarefa: string,
    descricaotarefa: string,
    horasestimadas : string,
    datacriacao : string,
    dataalteracao : string,
    usuariocriacao : string,
    usuarioalteracao : string
    }

    export type CreateTarefa = Omit<Tarefa,"idtarefa">;