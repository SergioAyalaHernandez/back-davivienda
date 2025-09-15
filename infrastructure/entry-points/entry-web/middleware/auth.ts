import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "@models/UserPayload";

const JWT_SECRET = process.env.JWT_SECRET || "secretito";

interface RequestWithUser extends Request {
  user?: UserPayload;
}

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado, token requerido" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET) as UserPayload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
