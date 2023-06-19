import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import jwt, { JwtPayload as DefaultPayload } from 'jsonwebtoken'
import { LoginBody } from '../routers/auth.router'
import { validateToken } from '../utils/authentication'

interface JwtPayload extends DefaultPayload {
  id: string
}

const prisma = new PrismaClient()

export const login = async (req: FastifyRequest<{ Body: LoginBody }>, rep: FastifyReply): Promise<FastifyInstance> => {
  let { email, password } = req.body

  try {
    // check if user exists
    let user = await prisma.user.findFirst({
      where: {
        email: email ?? "",
        password: password ?? ""

      },
      select: {
        id: true
      }
    })

    if (!user) {
      return rep.status(401).send({
        status: 'failed',
        data: 'USER_UNAUTHORIZED'
      })
    }
    // create auth and refresh tokens
    let token = jwt.sign({
      id: user.id
    }, process.env.AUTH_SECRET ?? "mylongsecretkey", {
      expiresIn: 15 * 60
    })

    let refreshToken = jwt.sign({
      id: user.id
    }, process.env.AUTH_SECRET ?? "mylongsecretkey", {
      expiresIn: 60 * 60 * 24 * 7
    })

    rep.setCookie('token', token, {
      httpOnly: true,
    })

    return rep.send({
      status: 'success',
      data: {
        refresh_token: refreshToken,
        expiresIn: 60 * 60 * 24 * 7
      }
    })

  } catch (e: any) {
    console.error('error: ', e.toString())
    return rep.status(500).send({
      status: 'failed',
      data: 'error: auth.controller.ts:19'
    })
  }
}


export const refresh = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let refreshToken = req.headers.authorization
    if (!refreshToken) {
      return rep.status(401).send({
        status: 'failed',
        data: "Not authorized"
      })
    }

    refreshToken = refreshToken.replace(/Bearer\s/, "")

    // validate token
    let { code, decoded } = validateToken(refreshToken)

    if(code !== 'TOKEN_VALID') {
      return rep.status(code === 'INTERNAL_ERROR' ? 500 : 401).send({
        status: 'failed',
        data: code
      })
    }

    // create new token
    let token = jwt.sign({ id: decoded?.id }, process.env.AUTH_SECRET ?? "mylongsecretkey")

    rep.setCookie('token', token, {
      httpOnly: true
    })

    return rep.send({
      status: 'success'
    })

  } catch (e: any) {
    console.error('error: ', e.message)
    if (/(invalid|malformed)/.test(e.message)) {
      return rep.status(401).send({
        status: 'failed',
        data: 'TOKEN_INVALID'
      })
    }
    return rep.status(500).send({
      status: 'failed',
      data: 'error: auth.controller.ts:103'
    })
  }
}

export const authenticate = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let token = req.cookies.token
    if (!token) {
      return rep.status(401).send({
        status: 'failed',
        data: 'TOKEN_NOT_PROVIDED'
      })
    }

    let valid = jwt.verify(token, process.env.AUTH_SECRET ?? "mylongsecretkey") as JwtPayload

    return rep.send({
      status: valid
    })


  } catch (e: any) {
    if (/(expired)/.test(e.message)) {
      return rep.status(401).send({
        status: 'success',
        data: "TOKEN_EXPIRED"
      })
    }
    return rep.status(500).send({
      status: 'failed',
      data: 'error: auth.controller.ts:129'
    })
  }

}

