import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { UsersController } from "@/controllers/users-controller";

const usersRoutes = Router()
const usersController = new UsersController()

// Rota para criar usuário
usersRoutes.post("/", usersController.create)

// Rota para Listar usuário
usersRoutes.get("/", ensureAuthenticated, verifyUserAuthorization(["manager"]), usersController.index);

export { usersRoutes }