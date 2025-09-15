import { UserRepository } from "infrastructure/driven-adapters/db-mongo/repository/UserRepository";
import { IUser } from "domain/models/User";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await this.userRepository.update(id, data);
  }
}
