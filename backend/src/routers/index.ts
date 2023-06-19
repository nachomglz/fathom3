import { FastifyInstance } from "fastify";
import userRouter from "./user.router";
import expenseListRouter from "./expenseList.router";
import expenseRouter from './expense.router'
import authRouter from './auth.router'

const router = (fastify: FastifyInstance, options: any, done: () => void) => {
  fastify.register(userRouter, { prefix: '/user' })
  fastify.register(expenseListRouter, { prefix: '/expense_list' })
  fastify.register(expenseRouter, { prefix: '/expense' })
  fastify.register(authRouter, { prefix: '/auth' })

  done()
}

export default router
