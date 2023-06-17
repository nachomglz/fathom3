import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (req: FastifyRequest<{ Body: Omit<User, "id"> }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { body: user } = req;

  try {
    let newUser = await prisma.user.create({
      data: {
        ...user
      },
      select: {
        password: false
      }
    })

    if (newUser) {
      return rep.send({
        status: 'success',
        data: newUser
      })
    } else {
      return rep.send({
        status: 'failed',
        data: "Error user.controller.ts ~ line: 21"
      })
    }
  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: user.controller.ts:15"
    })
  }

}

export const getUser = async (req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { id } = req.params;

  if (!id) {
    prisma.$disconnect()
    return rep.status(404).send({
      status: "failed",
      data: "User not found"
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
      status: "success",
      data: user
    })
  } catch (e: any) {
    console.error('[ERROR] ~ Getting user from db...')
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: 'error: user.controller.ts:34'
    })
  }
}

export const getUsers = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let users: User[] = await prisma.user.findMany()
    return rep.send({
      status: 'success',
      data: users
    })
  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: user.controller.ts:48"
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
      status: 'success',
      data: updatedUser
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: user.controller.ts:94"
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
      status: "success",
      data: user
    })

  } catch (e: any) {
    prisma.$disconnect()
    return rep.status(500).send({
      status: 'failed',
      data: "error: user.controller.ts:94"
    })
  }
}
