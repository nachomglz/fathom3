import { FastifyInstance, RouteHandlerMethod } from 'fastify'
import { login, refresh, authenticate } from '../controllers/auth.controller'

export interface LoginBody {
  email: string,
  password: string,
}

const authRouter = (fastify: FastifyInstance, options: any, done: () => void) => {
  fastify.post('/login', login)
  fastify.get('/refresh', refresh)
  fastify.post('/', authenticate)

  done()
}

export default authRouter
