'use server';
import { PrismaClient } from '@prisma/client'
import { Console } from 'console';

const prisma = new PrismaClient()


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};
export async function createServico(State: State, formData: FormData) {
    // Validate form using Zod
    // const validatedFields = CreateServico.safeParse({
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    // });
    let nome = formData.get('nome')?.toString()
    let tempo = formData.get('tempo')?.toString()
    let descricao = formData.get('descricao')?.toString()
    // console.log(formData)
    if (nome && tempo && descricao) {
        console.log("enviou")
        let servico = await prisma.servico.create({
            data: {
                nome: nome,
                duracao: parseInt(tempo, 10),
                descricao: descricao

            }
        })
    }
}