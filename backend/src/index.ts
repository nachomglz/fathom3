import server from "./server"
import { PrismaClient } from "@prisma/client"
import logger from "./utils/logger"
import cors from '@fastify/cors'

// Check if environment variables are set
let DATABASE_URL = process.env.DATABASE_URL
let AUTH_SECRET = process.env.AUTH_SECRET

if(!DATABASE_URL) {
    logger.error('DATABASE_URL environment variable not provided. Aborting...')
    process.exit(1)
}
if(!AUTH_SECRET) {
    logger.error('AUTH_SECRET environment variable not provided. Aborting...')
    process.exit(1)
}


server.register(cors, {
    origin: true,
    credentials: true,
})

server.listen({ port: 3001, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
        logger.error(err)
        process.exit(1)
    }

    let prisma = new PrismaClient()
    logger.info(`Server running at: ${addr}`)
})