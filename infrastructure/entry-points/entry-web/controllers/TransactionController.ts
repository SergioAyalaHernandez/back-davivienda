import { Request, Response } from "express";
import { TransactionRepository } from "@repositories/TransactionRepository";
import {CreateTransactionUseCase} from "../../../../domain/usecase/transaction/CreateTransactionUseCase";
import {GetTransactionsUseCase} from "../../../../domain/usecase/transaction/GetTransactionsUseCase";
import {UpdateTransactionUseCase} from "../../../../domain/usecase/transaction/UpdateTransactionUseCase";
import {DeleteTransactionUseCase} from "../../../../domain/usecase/transaction/DeleteTransactionUseCase";


const transactionRepo = new TransactionRepository();
const createTransactionUC = new CreateTransactionUseCase(transactionRepo);
const getTransactionsUC = new GetTransactionsUseCase(transactionRepo);
const updateTransactionUC = new UpdateTransactionUseCase(transactionRepo);
const deleteTransactionUC = new DeleteTransactionUseCase(transactionRepo);

export class TransactionController {
  static async create(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const transaction = await createTransactionUC.execute({ ...req.body, userId });
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const filters: any = {};
      if (req.query.tipo) filters.tipo = req.query.tipo;
      if (req.query.startDate && req.query.endDate) {
        filters.fecha = { $gte: new Date(req.query.startDate as string), $lte: new Date(req.query.endDate as string) };
      }
      const transactions = await getTransactionsUC.execute(userId, filters);
      res.json(transactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      // @ts-ignore
      const transaction = await updateTransactionUC.execute(req.params.id, req.body);
      if (!transaction) return res.status(404).json({ message: "No encontrado" });
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      // @ts-ignore
      const transaction = await deleteTransactionUC.execute(req.params.id);
      if (!transaction) return res.status(404).json({ message: "No encontrado" });
      res.json({ message: "Eliminado correctamente" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
