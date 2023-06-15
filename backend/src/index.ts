import server from "./server"
import { Prisma, PrismaClient } from "@prisma/client"

server.listen({ port: 3001, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    let prisma = new PrismaClient()

    console.log(`Server running at: ${addr}`)
})