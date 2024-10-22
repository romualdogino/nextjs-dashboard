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
    let item = []

    let valor = cookies().get(nome)
    if (valor) {
        valor = JSON.parse(valor.value)
        // for (var i = 0; i < valor.length; i++) {
        //     var jsonData = null;
        //     try {
        //       jsonData = JSON.parse(valor[i]);
        //     } catch (e) {
        //       jsonData = valor[i];
        //     }
        //     item.push(jsonData);
        //   }
    }
    return valor ? valor : null
}

