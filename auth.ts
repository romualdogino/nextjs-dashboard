import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { PrismaClient } from '@prisma/client'
import type { Cliente } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()


async function getCliente(email: string): Promise<Cliente | undefined> {
    try {
        // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        var  cliente = await prisma.cliente.findUnique({ where: { email }, select: { id: true, email: true, name: true, password: true} })
        // let password =await bcrypt.hash('123456',10)
    
        // console.log(password)
        
        if (cliente) { return cliente }
        // return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
async function getUser(email: string): Promise<User | undefined> {
    try {
        // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, name: true, password: true, especializacao: true } })
        // let password =await bcrypt.hash('123456',10)
        // console.log(password)
        if (user) { return user }
        // return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    console.log(user)
                    if(!user) {
                        console.log("kkkkkkkkk")
                        const cliente = await getCliente(email)
                        console.log({cliente})
                        if(!cliente) return null
                        const passwordsMatch = await bcrypt.compare(password, cliente.password);
                        if (passwordsMatch) return cliente;
                    }
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    // console.log(passwordsMatch)

                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});