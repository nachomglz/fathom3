import { FastifyInstance } from "fastify";
import { PrismaClient } from '@prisma/client'
import { getUser, getUsers, createUser, updateUser, deleteUser, getUserExpenseLists } from '../controllers'
import { verifyAuthentication } from "../utils/authentication";

const prisma = new PrismaClient()

const userRouter = (fastify: FastifyInstance, options: any, done: () => void) => {
    fastify.post('/', createUser);
    fastify.get('/', getUsers);
    fastify.get('/:id', getUser);
    fastify.get('/:id/expense_list', getUserExpenseLists);
    fastify.put('/:id', updateUser);
    fastify.delete('/:id', deleteUser)

    done()
}

export default userRouter