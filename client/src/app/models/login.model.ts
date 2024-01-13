export interface Login{
    id?: number,
    email: string,
    senha: string
}


//usando type para usar omit
export type LoginCrate = {
    id?: number,
    email: string,
    senha: string
}

export type musicaSemId = Omit<LoginCrate,"id">;