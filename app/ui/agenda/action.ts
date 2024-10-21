'use server'
import { cookies } from "next/headers";

export async function cookieCria(nome: string, valor: any) {
    if (typeof (valor) != 'string') {
        valor = JSON.stringify(valor)

        cookies().set(nome, valor)
    }
}
export async function cookieLe(nome: string) {
    // cookies().delete(nome)

    let valor = cookies().get(nome)
    if (valor) {
        valor = JSON.parse(valor.value)
    }
    return valor ? valor : null
}

