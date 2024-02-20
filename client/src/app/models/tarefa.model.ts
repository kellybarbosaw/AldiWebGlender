export interface Tarefa{

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
    