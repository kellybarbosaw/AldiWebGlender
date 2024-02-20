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
export type CreateProjetoTarefa = Omit<ProjetoTarefa,"idprojetotarefa">;