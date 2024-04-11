'use server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};
export async function createServico(State: State , formData: FormData) {
    // Validate form using Zod
    // const validatedFields = CreateServico.safeParse({
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    // });
    console.log(formData)
}