import { PrismaClient } from "@prisma/client";
import logger from "../src/utils/logger";

const prisma = new PrismaClient()

async function main() {
    // Seed users
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@email.com',
            name: 'John',
            surname: 'Doe',
            password: '123456789',
        },
    })

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@email.com',
            name: 'Emily',
            surname: 'James',
            password: '123456789',
        },
    })

    // seed expense lists
    const expenseList1 = await prisma.expenseList.create({
        data: {
            updatedAt: new Date(Date.now()),
            participants: {
                connect: [
                    { id: user1.id },
                    { id: user2.id }
                ]
            },
        }
    })

    // seed expense
    const expense1 = await prisma.expense.create({
        data: {
            name: "Gas",
            payerId: user1.id,
            expenseListId: expenseList1.id,
            amount: 40,
            type: "DEBTOR_OWES"
        }
    })

}

main()
    .then(_ => {
        logger.info('Database sown')
        prisma.$disconnect()
    }).catch(e => {
        logger.error('Seeding the database...')
        prisma.$disconnect()
        process.exit(1)
    })