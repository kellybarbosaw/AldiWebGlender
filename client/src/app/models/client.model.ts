export interface Client{
    idclient?: string,
    cnpj: string,
    nome: string,
    nomefantasia: string,
    inscrestadual: string,
    inscrmunicipal: string,
    telefone: string,
    celular?: string,
    email: string,
    rua: string,
    numero: string,
    complemento?: string,
    bairro: string,
    cidade: string,
    estado: string,
    pais: string,
    cep: string,
    respcomercial: string,
    telcomercial: string,
    celcomercial?: string,
    emailcomercial: string,
    respfinanceiro: string,
    telfinanceiro: string,
    celfinanceiro?: string,
    emailfinanceiro: string
}



export type CreateClient = Omit<Client,"idclient">;