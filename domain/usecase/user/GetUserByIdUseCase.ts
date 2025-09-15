import { UserRepository } from "infrastructure/driven-adapters/db-mongo/repository/UserRepository";
import { IUser } from "domain/models/User";

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }
}
