export interface TipoRecursos {

    IDTIPO?: number,
    DESCRICAO: string,
    DTCRIACAO : string,
    DTMODIFICACAO : string,
    USUARIOCRIACAO : string,
    USUARIOALTERACAO : string
    }


export interface TipoRecurso {

    idtipo?: number,
    descricao: string,
    dtcriacao : string,
    dtmodificacao : string,
    usuariocriacao : string,
    usuarioalteracao : string
    }

    export type CreateTipoRecurso = Omit<TipoRecurso,"idtipo">;