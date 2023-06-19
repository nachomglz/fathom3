import fastify from "fastify";
import router from "./routers";
import cookie from '@fastify/cookie'

let server = fastify({
  logger: true
})

server.register(cookie, {
  secret: process.env.AUTH_SECRET ?? "mylongsecretkey"
})
server.register(router, { prefix: '/api' })

export default server;
