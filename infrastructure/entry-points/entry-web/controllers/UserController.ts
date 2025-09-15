import type { Request, Response } from "express";
import { UserRepository } from "@repositories/UserRepository";
import { CreateUserUseCase } from "@usecase/user/CreateUserUseCase";
import { GetAllUsersUseCase } from "@usecase/user/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "@usecase/user/GetUserByIdUseCase";
import { UpdateUserUseCase } from "@usecase/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "@usecase/user/DeleteUserUseCase";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await getAllUsersUseCase.execute();
    res.json(users);
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const user = await getUserByIdUseCase.execute(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const user = await updateUserUseCase.execute(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    // @ts-ignore
    const deleted = await deleteUserUseCase.execute(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(204).send();
  }
}
