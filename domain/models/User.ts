import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  correo: string;
  password: string;
  rol: string;
}

const UserSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  segundoNombre: { type: String },
  primerApellido: { type: String, required: true },
  segundoApellido: { type: String },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'user'], default: 'user' }
}, {
  timestamps: true
});

export const UserModel = model<IUser>("Usuario", UserSchema);
