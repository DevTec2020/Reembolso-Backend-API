// Controle de usuários
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

class UsersController {
    async create(request: Request, response: Response){
        const {name, password, role} = request.body

        // Verificação de preenchimento de dados do login e senha
        if (!name || !password){
            return response.status(400).json({ message: "Nome e senha são obrigatórios!"});
        }

        // Verifica se ja exite usuário com o mesmo nome
        const userExists = await prisma.user.findUnique({
            where: {name}
        })

        
        if (userExists) {
            return response.status(409).json({ message: "Este usuário já existe." });
        }

        //Cripitografando senha
        const hashedPassword = await hash(password, 8)

        
        try {
            await prisma.user.create({
                data: {
                    name,
                    password: hashedPassword,
                    role: role || undefined,
                },
            });

            return response.status(201).json({ message: "Conta criada com sucesso!" });
        } catch (error) {
            return response.status(500).json({ message: `Erro interno do servidor: ${error}` });
        }
    }

    async index(request: Request, response: Response) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                role: true,
                createdAt: true
            }
        });

        return response.json(users);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params

        const user = await prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            return response.status(404).json({message: "Usuário não encontrado."})
        }

        try{
            await prisma.user.delete({
                where: { id }
            })
            
            return response.status(200).json({message: "Usuário removido com sucesso!"})
        } catch (error) {
            return response.status(500).json({message: `Erro ao tentar remover usuário: ${error}`})
        }
    }
}

export {UsersController }