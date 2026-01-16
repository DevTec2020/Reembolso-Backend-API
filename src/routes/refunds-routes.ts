import { Router } from "express";
import { RefundsController } from "../controllers/refunds-controller";

import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const refundsRoutes = Router();
const refundsController = new RefundsController();

// Apenas employee podem fazer o post
refundsRoutes.post(
  "/",
  verifyUserAuthorization(["employee"]),
  refundsController.create
);

// Apenas manager podem ver a lista geral
refundsRoutes.get(
  "/",
  verifyUserAuthorization(["manager"]),
  refundsController.index
);

// Funcionários e Gerentes podem ver os detalhes de um reembolso específico
refundsRoutes.get(
  "/:id",
  verifyUserAuthorization(["employee", "manager"]),
  refundsController.show
);

export { refundsRoutes };