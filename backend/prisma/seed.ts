import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // Seed users
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@email.com',
            name: 'John',
            surname: 'Doe',
            password: '123456789',
            totalBalance: 40
        },
    })

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@email.com',
            name: 'Emily',
            surname: 'James',
            password: '123456789',
            totalBalance: -40
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
        console.log('[INFO] ~ Database sown')
    }).catch(e => {
        console.error('[ERROR] ~ Seeding the database...')
        process.exit(1)
    })