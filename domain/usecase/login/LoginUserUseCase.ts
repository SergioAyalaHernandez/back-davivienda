import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "@repositories/UserRepository";
import { IUser } from "@models/User";

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<{ token: string; user: Partial<IUser> }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    // Generar token
    const token = jwt.sign(
      { id: user._id, correo: user.correo },
      process.env.JWT_SECRET || "secretito",
      { expiresIn: "1h" }
    );

    const { password: _, ...userData } = user.toObject();

    return { token, user: userData };
  }
}
