export interface ProjetoTarefa{

    idprojetotarefa?: string,

    idtarefa: string,
    idprojeto: string,
    statustarefa: string,

    titulotarefa: string,
    descricaotarefa: string,
    datainicioprevista: string,
    datafimprevista: string,
    dtcriacao: string,
    dtalteracao: string,
    usuariocriacao: string,
    usuarioalteracao: string,
    horasestimadas: string,
    horasgastas: string,
    saldohoras: string,
    etapa: string
}
export interface ProjetoTarefadbDB{
    IDPROJETOTAREFA?: string,

    IDTAREFA: string,
    IDPROJETO: string,
    STATUSTAREFA: string,

    TITULOTAREFA: string,
    DESCRICAOTAREFA: string,
    DATAINICIOPREVISTA: string,
    DATAFIMPREVISTA: string,
    DTCRIACAO: string,
    DTALTERACAO: string,
    USUARIOCRIACAO: string,
    USUARIOALTERACAO: string,
    HORASESTIMADAS: string,
    HORASGASTAS: string,
    SALDOHORAS: string,
    ETAPA: string
}
export type CreateProjetoTarefa = Omit<ProjetoTarefa,"idprojetotarefa">;