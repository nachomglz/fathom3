import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { ExpenseList, PrismaClient, User } from '@prisma/client'
import logger from '../utils/logger';
import { CustomResponseCodes, CustomResponseStatus } from '../utils/types';

const prisma = new PrismaClient()

export const createUser = async (req: FastifyRequest<{ Body: Omit<User, "id"> }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { body: user } = req;

  try {
    let newUser = await prisma.user.create({
      data: {
        ...user
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        password: false
      }
    })

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: newUser
    })
  } catch (e: any) {
    prisma.$disconnect()
    logger.error(e.message)
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }

}

export const getUser = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { id } = req.params;

  if (!id) {
    prisma.$disconnect()
    return rep.status(404).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.NOT_FOUND,
      data: null
    })
  }

  try {
    let user = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      },
    })

    prisma.$disconnect()

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: user
    })
  } catch (e: any) {
    logger.error('Getting user from db...')
    prisma.$disconnect()
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}

export const getUsers = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let users: User[] = await prisma.user.findMany()
    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: users
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

export const updateUser = async (req: FastifyRequest<{ Body: Partial<Omit<User, "id">>, Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let user = req.body
    let { id } = req.params

    let updatedUser = await prisma.user.update({
      data: { ...user },
      where: {
        id: parseInt(id)
      }
    })

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: updatedUser
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

export const deleteUser = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  const { id } = req.params
  try {
    let user = await prisma.user.delete({
      where: {
        id: parseInt(id)
      },
    })

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: user
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

export const getUserExpenseLists = async (req: FastifyRequest<{ Params: { id: string }}>, rep: FastifyReply): Promise<FastifyInstance> => {
  try{
    let userId = req.params.id
    let expenseLists: Partial<ExpenseList>[] = await prisma.expenseList.findMany({
      where: {
        participants: {
          some: {
            id: parseInt(userId)
          }
        }
      },
      select: {
        id: true,
        expenses: {
          select: {
            id: true,
            name: true,
            amount: true,
            payerId: true,
            type: true,
            payer: true,
            createdAt: true,
          }
        },
        participants: true,
        createdAt: true 
      }
    })

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: expenseLists
    })
  } catch(e: any) {
    logger.error("error: ", e.message)
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}
