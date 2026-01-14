// Controle de Sessão
import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma"
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

class SessionsController {
    async create(request: Request, response: Response){
        const {name, password} = request.body

        // Verificação de preenchimento de dados do login e senha
        if (!name || !password){
            return response.status(400).json({ message: "Nome e senha são obrigatórios!"});
        }

        // Verifica se exite esse usuário
        const user = await prisma.user.findFirst({
            where:{name}
        })

        if (!user) {
            return response.status(401).json({ message: "E-mail ou senha inválido" });
        }

        
        // Compara a senha digitada coma desse usuário
        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            return response.status(401).json({ message: "E-mail ou senha inválido" });
        }

        
        //Autenticaçao jwt
        const { secret, expiresIn } = authConfig.jwt

        const token = sign ({ role: user.role}, secret, {
            subject: user.id,
            expiresIn,
        })

        //limpando a senha para depois retornar
        const { password: _, ...userWithoutPassword } = user

        response.json({ token, user: userWithoutPassword })

    }
}

export {SessionsController}