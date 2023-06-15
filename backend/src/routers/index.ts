import { FastifyInstance } from "fastify";
import userRouter from "./user.router";

const router = (fastify: FastifyInstance, options: any, done: () => void) => {
    fastify.register(userRouter, { prefix: '/user' })
    done()
}

export default router