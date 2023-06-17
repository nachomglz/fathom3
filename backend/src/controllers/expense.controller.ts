import { Expense, PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'

const prisma = new PrismaClient()

export const createExpense = async (req: FastifyRequest<{ Body: Omit<Expense, "id"> }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let expense = req.body;

  try {
    let newExpense = await prisma.expense.create({
      data: {
        ...expense,
      },
    })

    prisma.$disconnect()

    return rep.send({
      status: 'success',
      data: newExpense
    })
  } catch (e: any) {
    console.error('error: ', e.toString())
    return rep.status(500).send({
      status: 'failed',
      data: 'error: expense.controller.ts:25'
    })
  }
}

export const getExpense = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { id } = req.params

  try {
    let expense = await prisma.expense.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    prisma.$disconnect()

    if (!expense) {
      return rep.status(404).send({
        status: 'failed',
        data: "The expense doesn't exist"
      })
    }

    return rep.send({
      status: 'success',
      data: expense
    })
  } catch (e: any) {
    console.error('error: ', e.toString())
    return rep.status(500).send({
      status: 'failed',
      data: 'error: expense.controller.ts:58'
    })
  }
}

export const getExpenses = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let expenses = await prisma.expense.findMany()

    prisma.$disconnect()

    return rep.send({
      status: 'success',
      data: expenses
    })
  } catch (e: any) {
    console.error('error: ', e.toString())
    return rep.status(500).send({
      status: 'failed',
      data: 'error: expense.controller.ts:77'
    })
  }
}

export const updateExpense = async (req: FastifyRequest<{ Body: Partial<Omit<Expense, "id">>, Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { id } = req.params
  let expense = req.body;

  try {
    let updatedExpense = await prisma.expense.update({
      data: { ...expense },
      where: {
        id: parseInt(id)
      }
    })

    prisma.$disconnect()

    return rep.send({
      status: 'success',
      data: updatedExpense
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: 'error: expense.controller.ts:105'
    })

  }
}

export const deleteExpense = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { id } = req.params

  try {
    let expense = await prisma.expense.delete({
      where: {
        id: parseInt(id)
      }
    })

    prisma.$disconnect()

    return rep.send({
      status: 'success',
      data: expense
    })

  } catch (e: any) {

    prisma.$disconnect()

    return rep.status(500).send({
      status: 'failed',
      data: 'error: expense.controller.ts:132'
    })
  }
}
