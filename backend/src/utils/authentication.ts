import { FastifyInstance, FastifyRequest, FastifyReply  } from "fastify"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomResponseStatus, CustomResponseCodes } from "./types"
import logger from "./logger"

interface ValidJwtPayload extends JwtPayload {
    id: number
}

type TokenValidationResponse = {
    code: CustomResponseCodes,
    decoded?: ValidJwtPayload
}

export const verifyAuthentication = (req: FastifyRequest, rep: FastifyReply, done: () => void) => {
    try {
        let token = req.cookies.token
        if(!token) {
            return rep.status(401).send({
                status: CustomResponseStatus.FAIL,
                code: CustomResponseCodes.TOKEN_NOT_PROVIDED,
                data: null
            })
        }

        let validation = validateToken(token)

        if (validation.code === CustomResponseCodes.TOKEN_VALID) {
            done()
        } else {
            return rep.status(401).send({
                status: CustomResponseStatus.FAIL,
                code: validation.code,
                data: null
            })
        }
    } catch(e: any) {
        return rep.status(500).send({
            status: CustomResponseStatus.FAIL,
            code: CustomResponseCodes.INTERNAL_SERVER_ERROR,
            data: null
        })
    }

    done()
}

export const validateToken = (token: string): TokenValidationResponse => {
    try {
        let valid = jwt.verify(token, process.env.AUTH_SECRET ?? "mylongsecretkey") as ValidJwtPayload
        return valid ? { code: CustomResponseCodes.TOKEN_VALID, decoded: valid } : { code: CustomResponseCodes.TOKEN_INVALID}
    } catch(e: any) {
        switch(true) {
            case /expired/.test(e.message):
                return { code: CustomResponseCodes.TOKEN_EXPIRED }
            case /invalid/.test(e.message):
                return { code: CustomResponseCodes.TOKEN_INVALID }
            case /malformed/.test(e.message):
                return { code: CustomResponseCodes.TOKEN_MALFORMED }
            default:
                return { code: CustomResponseCodes.INTERNAL_SERVER_ERROR}
        }
    }
}