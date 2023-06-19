import { FastifyInstance, FastifyRequest, FastifyReply  } from "fastify"
import jwt, { JwtPayload } from 'jsonwebtoken'

export const verifyAuthentication = (req: FastifyRequest, rep: FastifyReply, done: () => void) => {
    try {
        let token = req.cookies.token
        if(!token) {
            return rep.status(401).send({
                status: 'failed',
                data: 'TOKEN_NOT_PROVIDED'
            })
        }

        let valid = jwt.verify(token, process.env.AUTH_SECRET ?? "mylongsecretkey");

        if (!valid) {
            return rep.status(401).send({
                status: 'failed',
                data: 'not_authorized'
            })
        }

        done()

    } catch(e: any) {
        return rep.status(500).send({
            status: 'failed',
            data: 'error: authentication:15'
        })
    }

    done()
}

interface ValidJwtPayload extends JwtPayload {
    id: string
}

type TokenValidationResponse = {
    code: "TOKEN_INVALID" | "TOKEN_EXPIRED" | "TOKEN_MALFORMED" | "INTERNAL_ERROR" | "TOKEN_VALID",
    decoded?: ValidJwtPayload
}

export const validateToken = (token: string): TokenValidationResponse => {
    try {
        let valid = jwt.verify(token, process.env.AUTH_SECRET ?? "mylongsecretkey") as ValidJwtPayload
        return valid ? { code: 'TOKEN_VALID', decoded: valid } : { code: 'TOKEN_INVALID'}
    } catch(e: any) {
        switch(true) {
            case /expired/.test(e.message):
                return { code: 'TOKEN_EXPIRED' }
            case /invalid/.test(e.message):
                return { code: 'TOKEN_INVALID' }
            case /malformed/.test(e.message):
                return { code: 'TOKEN_MALFORMED' }
            default:
                return { code: 'INTERNAL_ERROR'}
        }
    }
}