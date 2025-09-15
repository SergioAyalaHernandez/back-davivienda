import { Request, Response } from "express";
import { UserRepository } from "@repositories/UserRepository";
import { LoginUserUseCase } from "@domain/usecase/login/LoginUserUseCase";

const userRepository = new UserRepository();
const loginUserUseCase = new LoginUserUseCase(userRepository);

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await loginUserUseCase.execute(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
