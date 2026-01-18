import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-Authorization";

const usersRoutes = Router()
const usersController = new UsersController()

// Rota para criar usuário
usersRoutes.post("/", usersController.create)

// Rota para Listar usuário
usersRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["manager"]), usersController.index);

// Rota para excluir usuário
usersRoutes.delete("/:id", ensureAuthenticated, verifyUserAuthorization(["manager"]), usersController.delete)

export { usersRoutes }