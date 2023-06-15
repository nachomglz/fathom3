import {FastifyInstance} from "fastify";
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

const userRouter = (fastify: FastifyInstance, options: any, done: () => void) => {
    fastify.post('/', async (req, rep) => {
        let { email, name, password, surname } = req.body as Omit<User, "id">

        try {
            let newUser = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: password,
                    surname
                }
            })

            if (newUser) {
                return rep.send({
                    status: "success",
                    user: newUser
                })
            }

        } catch(e: any) {
            rep.send({
                status: 'failed',
                error: e.toString()
            })
        }

    })
    done()
}

export default userRouter