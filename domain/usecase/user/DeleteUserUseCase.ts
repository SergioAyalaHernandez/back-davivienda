import { UserRepository } from "infrastructure/driven-adapters/db-mongo/repository/UserRepository";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.userRepository.delete(id);
    return !!deleted;
  }
}
