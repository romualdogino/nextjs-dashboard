import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createUser() {
    try {
        const user = await prisma.user.create({
            data: {
                name: 'Rich',
                email: 'hello@prisma.com'
              
            },
        })
        return user
    } catch (error) {
        console.log(error)
    }
    
   
}
export async function getAll() {
    try {
        const user = await prisma.user.findMany()
        return user
    } catch (error) {
        console.log(error)
    }
    
   
}
