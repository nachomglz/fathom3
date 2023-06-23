import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient, ExpenseList } from '@prisma/client'
import { CustomResponseCodes, CustomResponseStatus } from "../utils/types";
import logger from "../utils/logger";

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
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: newExpenseList
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

export const getExpenseLists = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let expenseLists = await prisma.expenseList.findMany({
      select: {
        id: true,
      }
    });

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expenseLists
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
        status: CustomResponseStatus.FAIL,
        code: CustomResponseCodes.NOT_FOUND,
        data: null
      })
    }

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expenseList
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
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: updatedExpenseList
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

export const deleteExpenseList = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  const { id } = req.params

  try {
    let expenseList = await prisma.expenseList.delete({
      where: {
        id: parseInt(id)
      },
    })

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expenseList
    })

  } catch (e: any) {
    if (e.code && e.code === 'P2025') {
      return rep.status(404).send({
        status: CustomResponseStatus.FAIL,
        code: CustomResponseCodes.NOT_FOUND,
        data: null
      })
    }

    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}
