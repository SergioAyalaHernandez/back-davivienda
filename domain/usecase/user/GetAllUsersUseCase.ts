
import { UserRepository } from "infrastructure/driven-adapters/db-mongo/repository/UserRepository";
import { IUser } from "domain/models/User";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }
}
