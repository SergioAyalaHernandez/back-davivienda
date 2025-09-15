import bcrypt from "bcrypt";
import {UserRepository} from "infrastructure/driven-adapters/db-mongo/repository/UserRepository";
import {IUser} from "domain/models/User";


export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: IUser): Promise<IUser> {
    const existe = await this.userRepository.findByEmail(userData.correo);
    if (existe) throw new Error("El correo ya está registrado");

    userData.password = await bcrypt.hash(userData.password, 10);

    return await this.userRepository.create(userData);
  }
}
