import fastify from "fastify";
import router from "./routers";

let server = fastify({
    logger: true
})

server.register(router, { prefix: '/api' })

export default server;