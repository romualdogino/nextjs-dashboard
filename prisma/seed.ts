const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const rom = await prisma.user.upsert({
        where: { email: 'rom@rom.com' },
        update: {},
        create: {
            email: 'rom@rom.com',
            name: 'rom',
            password: '$2y$10$7S11QvycmKhMvg4dgGeuz.y.7gUgwxAjwL4GEq8FpVgB4CNMFUkGe',
            especializacao: ['aa', 'bb']
        }
    })
    console.log(rom)
}
main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})
