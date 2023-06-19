import { Expense, PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import logger from '../utils/logger';
import { CustomResponseCodes, CustomResponseStatus } from '../utils/types';

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
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: newExpense
    })
  } catch (e: any) {
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
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
        status: CustomResponseStatus.FAIL,
        code: CustomResponseCodes.NOT_FOUND,
        data: null
      })
    }

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expense
    })

  } catch (e: any) {
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}

export const getExpenses = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let expenses = await prisma.expense.findMany()

    prisma.$disconnect()

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expenses
    })
  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
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
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: updatedExpense
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
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
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expense
    })

  } catch (e: any) {

    prisma.$disconnect()

    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}
