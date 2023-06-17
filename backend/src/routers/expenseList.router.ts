import { FastifyInstance } from "fastify";
import { createExpenseList, getExpenseLists, getExpenseList, updateExpenseList, deleteExpenseList } from "../controllers/expenseList.controller";


const expenseListRouter = (fastify: FastifyInstance, options: any, done: () => void) => {
  fastify.post('/', createExpenseList);
  fastify.get('/', getExpenseLists);
  fastify.get('/:id', getExpenseList);
  fastify.put('/:id', updateExpenseList);
  fastify.delete('/:id', deleteExpenseList);
  done()
}

export default expenseListRouter
