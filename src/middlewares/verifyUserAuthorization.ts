import { Request, Response, NextFunction } from "express";

export function verifyUserAuthorization(roleToVerify: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = (request as Request & { user: { role: string } }).user;

    if (!roleToVerify.includes(role)) {
      return response.status(401).json({ message: "Usuário não autorizado (Unauthorized)" });
    }

    return next();
  };
}