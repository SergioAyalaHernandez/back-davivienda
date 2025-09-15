import { TransactionModel, ITransaction } from "@models/Transaction";
import { Types } from "mongoose";

export class TransactionRepository {
  async create(transaction: ITransaction): Promise<ITransaction> {
    const newTransaction = new TransactionModel(transaction);
    return await newTransaction.save();
  }

  async findByUser(userId: string, filters: any = {}): Promise<ITransaction[]> {
    const query: any = { userId: new Types.ObjectId(userId), ...filters };
    return await TransactionModel.find(query).sort({ fecha: -1 });
  }

  async findById(id: string): Promise<ITransaction | null> {
    return await TransactionModel.findById(id);
  }

  async update(id: string, data: Partial<ITransaction>): Promise<ITransaction | null> {
    return await TransactionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ITransaction | null> {
    return await TransactionModel.findByIdAndDelete(id);
  }
}
