import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient, ExpenseList } from '@prisma/client'

const prisma = new PrismaClient()

export const createExpenseList = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let newExpenseList = await prisma.expenseList.create({
      data: {
        updatedAt: new Date(Date.now()),
      }
    })

    prisma.$disconnect()

    return rep.send({
      status: 'success',
      data: newExpenseList
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: expenseList.controller.ts:13"
    })
  }
}

export const getExpenseLists = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let expenseLists = await prisma.expenseList.findMany({
      select: {
        id: true,
        createdAt: true,
        expenses: true,
        participants: true
      }
    });

    return rep.send({
      status: 'success',
      data: expenseLists
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: expenseList.controller.ts:37"
    })
  }
}

export const getExpenseList = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { id } = req.params;
  try {
    let expenseList = await prisma.expenseList.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        expenses: true,
        participants: true
      }
    })

    if (!expenseList) {
      return rep.status(404).send({
        status: 'success',
        data: "Expense list not found"
      })
    }

    return rep.send({
      status: 'success',
      data: expenseList
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: expenseList.controller.ts:63"
    })
  }
}

export const updateExpenseList = async (req: FastifyRequest<{ Body: Partial<ExpenseList>, Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  const expenseList = req.body
  const { id } = req.params

  try {

    let updatedExpenseList = await prisma.expenseList.update({
      data: { ...expenseList, updatedAt: new Date(Date.now()) },
      where: {
        id: parseInt(id)
      }
    })

    prisma.$disconnect()

    return rep.send({
      status: 'success',
      data: updatedExpenseList
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: expenseList.controller.ts:128"
    })
  }
}

export const deleteExpenseList = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  const { id } = req.params

  try {
    let expenseList = await prisma.expenseList.delete({
      where: {
        id: parseInt(id)
      },
    })

    return rep.send({
      status: 'success',
      data: expenseList
    })

  } catch (e: any) {
    if (e.code && e.code === 'P2025') {
      return rep.status(404).send({
        status: 'failed',
        data: "The expense list does not exist"
      })
    }

    return rep.status(500).send({
      status: 'failed',
      data: "error: expenseList.controller.ts:115"
    })
  }
}
