import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { authConfig } from "@/configs/auth"

interface TokenPayload {
  role: string
  sub: string
}

type AuthenticatedRequest = Request & {
  user: {
    id: string;
    role: string;
  }
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        return response.status(401).json({ message: "Token JWT não Encontrado" });
    }
    
    //pegando apenas o token
    const [, token] = authHeader.split(" ")
  
    try {
        const { role, sub: user_id } = verify(
        token,
        authConfig.jwt.secret
        ) as TokenPayload

        (request as AuthenticatedRequest).user = {
        id: user_id,
        role,
        }

        return next()
    } catch (error) {
        return response.status(401).json({ message: "Token JWT invalido" });
    }
}

export { ensureAuthenticated }
