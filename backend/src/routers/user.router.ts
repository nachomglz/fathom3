import { FastifyInstance } from "fastify";
import { PrismaClient } from '@prisma/client'
import { getUser, getUsers, createUser, updateUser, deleteUser } from '../controllers'

const prisma = new PrismaClient()

const userRouter = (fastify: FastifyInstance, options: any, done: () => void) => {
    fastify.post('/', createUser);
    fastify.get('/', getUsers);
    fastify.get('/:id', getUser);
    fastify.put('/:id', updateUser);
    fastify.delete('/:id', deleteUser)

    done()
}

export default userRouter