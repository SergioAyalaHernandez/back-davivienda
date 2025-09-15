import { TransactionRepository } from "@repositories/TransactionRepository";
import { ITransaction } from "@models/Transaction";

export class GetTransactionsUseCase {
  constructor(private transactionRepo: TransactionRepository) {}
  async execute(userId: string, filters: any = {}): Promise<ITransaction[]> {
    return await this.transactionRepo.findByUser(userId, filters);
  }
}
