import { FastifyInstance } from "fastify";
import userRouter from "./user.router";
import expenseListRouter from "./expenseList.router";

const router = (fastify: FastifyInstance, options: any, done: () => void) => {
    fastify.register(userRouter, { prefix: '/user' })
    fastify.register(expenseListRouter, { prefix: '/expense_list' })

    done()
}

export default router