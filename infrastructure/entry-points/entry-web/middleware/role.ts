import { Request, Response, NextFunction } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado: solo admin" });
  }
  next();
};
