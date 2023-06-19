import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import jwt, { JwtPayload as DefaultPayload } from 'jsonwebtoken'
import { LoginBody } from '../routers/auth.router'
import { validateToken } from '../utils/authentication'
import logger from '../utils/logger'
import { CustomResponseCodes, CustomResponseStatus } from '../utils/types'

interface JwtPayload extends DefaultPayload {
  id: string
}

const prisma = new PrismaClient()

export const login = async (req: FastifyRequest<{ Body: LoginBody }>, rep: FastifyReply): Promise<FastifyInstance> => {
  if (!req.body) {
    return rep.status(422).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.UNPROCESSABLE_ENTITY,
      data: null
    })
  }

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
        status: CustomResponseStatus.FAIL,
        code: CustomResponseCodes.UNAUTHORIZED,
        data: null
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
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: {
        refresh_token: refreshToken,
        expiresIn: 60 * 60 * 24 * 7
      }
    })

  } catch (e: any) {
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}


export const refresh = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let refreshToken = req.headers.authorization
    if (!refreshToken) {
      return rep.status(401).send({
        status: CustomResponseStatus.FAIL,
        code: CustomResponseCodes.TOKEN_NOT_PROVIDED,
        data: null
      })
    }

    refreshToken = refreshToken.replace(/Bearer\s/, "")

    // validate token
    let { code, decoded } = validateToken(refreshToken)

    if(code !== CustomResponseCodes.TOKEN_VALID) {
      return rep.status(code === CustomResponseCodes.INTERNAL_SERVER_ERROR ? 500 : 401).send({
        status: CustomResponseStatus.FAIL,
        code: code,
        data: null
      })
    }

    // create new token
    let token = jwt.sign({ id: decoded?.id }, process.env.AUTH_SECRET ?? "mylongsecretkey")

    rep.setCookie('token', token, {
      httpOnly: true
    })

    return rep.send({
      status: CustomResponseStatus.SUCCESS,
      code: CustomResponseCodes.AUTHORIZED,
      data: null
    })

  } catch (e: any) {
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }
}

export const authenticate = async (req: FastifyRequest, rep: FastifyReply): Promise<FastifyInstance> => {
  try {
    let token = req.cookies.token
    if (!token) {
      return rep.status(401).send({
        status: CustomResponseStatus.FAIL,
        code: CustomResponseCodes.TOKEN_NOT_PROVIDED,
        data: null
      })
    }

    let validation = validateToken(token)

    switch(validation.code) {
      case CustomResponseCodes.TOKEN_EXPIRED:
      case CustomResponseCodes.TOKEN_INVALID:
      case CustomResponseCodes.TOKEN_MALFORMED:
      case CustomResponseCodes.TOKEN_NOT_PROVIDED:
      case CustomResponseCodes.UNAUTHORIZED:
        return rep.status(401).send({
          status: CustomResponseStatus.FAIL,
          code: validation.code,
          data: null,
        })
      case CustomResponseCodes.INTERNAL_SERVER_ERROR:
        return rep.status(500).send({
          status: CustomResponseStatus.FAIL,
          code: validation.code,
          data: null,
        })
      case CustomResponseCodes.TOKEN_VALID:
      case CustomResponseCodes.AUTHORIZED:
      default: 
        return rep.send({
          status: CustomResponseStatus.SUCCESS,
          code: validation.code,
          data: null,
        })
    }
  } catch (e: any) {
    return rep.status(500).send({
      status: CustomResponseStatus.FAIL,
      code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
      data: null
    })
  }

}

