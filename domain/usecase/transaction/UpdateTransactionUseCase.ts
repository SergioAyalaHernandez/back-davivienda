import { TransactionRepository } from "@repositories/TransactionRepository";
import { ITransaction } from "@models/Transaction";

export class UpdateTransactionUseCase {
  constructor(private transactionRepo: TransactionRepository) {}
  async execute(id: string, data: Partial<ITransaction>): Promise<ITransaction | null> {
    return await this.transactionRepo.update(id, data);
  }
}
