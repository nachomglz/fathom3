import { FastifyInstance } from 'fastify'
import { createExpense, getExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense.controller'

const expenseRouter = (fastify: FastifyInstance, options: any, done: () => void) => {
  fastify.post('/', createExpense);
  fastify.get('/:id', getExpense)
  fastify.get('/', getExpenses)
  fastify.put('/:id', updateExpense)
  fastify.delete('/:id', deleteExpense)

  done()
}

export default expenseRouter
