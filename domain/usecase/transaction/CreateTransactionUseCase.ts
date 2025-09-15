import { TransactionRepository } from "@repositories/TransactionRepository";
import { ITransaction } from "@models/Transaction";

export class CreateTransactionUseCase {
  constructor(private transactionRepo: TransactionRepository) {}
  async execute(transaction: ITransaction): Promise<ITransaction> {
    return await this.transactionRepo.create(transaction);
  }
}
