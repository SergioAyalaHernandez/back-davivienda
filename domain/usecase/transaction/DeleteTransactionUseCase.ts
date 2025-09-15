import { TransactionRepository } from "@repositories/TransactionRepository";
import { ITransaction } from "@models/Transaction";


export class DeleteTransactionUseCase {
  constructor(private transactionRepo: TransactionRepository) {}
  async execute(id: string): Promise<ITransaction | null> {
    return await this.transactionRepo.delete(id);
  }
}