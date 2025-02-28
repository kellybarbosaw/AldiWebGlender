export interface Agendas{

    IDAGENDA?: number,
    ATIVIDADE: string,
    HORAINICIO : string,
    HORAFINAL : string,
    HORAALMOCO : string,
    HORAPREVISTA : string,
    HORAREALIZADA : string,
    DATA: string,
    EMPRESATRABALHADA: string,
    STATUS: number,
    USUARIOCRIACAO: string,
    }

export interface Agenda{

    idagenda?: number,
    atividade: string,
    horainicio : string,
    horafinal : string,
    horaalmoco : string,
    horaprevista : string,
    horarealizada : string,
    data: string,
    empresaTrabalhada: string,
    status: number,
    usuariocriacao: string,
    }

    export interface AgendaUser{
        usuariocriacao: string,
    }

    export type CreateAgenda = Omit<Agenda,"idagenda">;