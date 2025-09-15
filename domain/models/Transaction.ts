import { Schema, model, Document } from "mongoose";
import { Types } from "mongoose";

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  tipo: "ingreso" | "gasto";
  monto: number;
  descripcion?: string;
  fecha: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    tipo: { type: String, enum: ["ingreso", "gasto"], required: true },
    monto: { type: Number, required: true },
    descripcion: { type: String },
    fecha: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const TransactionModel = model<ITransaction>("Transaction", TransactionSchema);
