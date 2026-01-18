import { Request, Response } from "express";
import { prisma } from "@/database/prisma";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  }
}

class RefundsController {
  async create(request: Request, response: Response) {
    const { name, category, amount, filename } = request.body;
    
    // Pegando o ID do usuário
    const userId = (request as AuthenticatedRequest).user?.id;

    // Validação de Segurança
    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    // Validação de Campos Obrigatórios
    if (!name || !category || !amount || !filename) {
      return response.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Validação de Categoria
    const validCategories = ["Alimentação", "Outros", "services", "Transporte", "Hospedagem"];
    if (!validCategories.includes(category)) {
      return response.status(400).json({ message: "Categoria inválida." });
    }

    // Validação de Valor positivo
    if (Number(amount) <= 0) {
      return response.status(400).json({ message: "O valor deve ser positivo." });
    }

    try {
      // Subindo dados recebidos para o banco
      const refund = await prisma.refunds.create({
        data: {
          name,
          category,
          amount: Number(amount),
          filename,
          userId,
        },
      });

      return response.status(201).json(refund);

    } catch (error) {
      return response.status(500).json({ message: `Erro ao subir os dados para o banco: ${error}` });
    }
  }

  async index(request: Request, response: Response) {
    const name = request.query.name as string || "";
    const page = Number(request.query.page) || 1;
    const perPage = Number(request.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    try {
      const refunds = await prisma.refunds.findMany({
        skip,
        take: perPage,
        where: {
            name: { contains: name }
        },
        orderBy: { createdAt: "desc" },
        include: { 
            user: { 
                select: { 
                    name: true, 
                    role: true 
                } 
            } 
        }, 
      });

      const totalRecords = await prisma.refunds.count({
          where: { name: { contains: name } }
      });
      
      const totalPages = Math.ceil(totalRecords / perPage);

      return response.json({
        refunds,
        pagination: {
          page,
          perPage,
          totalRecords,
          totalPages: totalPages > 0 ? totalPages : 1,
        },
      });

    } catch (error) {
      return response.status(500).json({ message: `Erro ao listar: ${error}` });
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const refund = await prisma.refunds.findUnique({
        where: { id },
        include: { 
            user: { 
                select: { 
                    name: true, 
                    role: true 
                } 
            } 
        },
      });

      if (!refund) {
        return response.status(404).json({ message: "Reembolso não encontrado." });
      }

      return response.json(refund);

    } catch (error) {
       return response.status(500).json({ message: `Erro ao buscar: ${error}` });
    }
  }
}

export { RefundsController };