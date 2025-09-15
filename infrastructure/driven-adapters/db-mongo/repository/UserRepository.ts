
import { UserModel, IUser } from "@models/User";
import mongoose from "mongoose";


export class UserRepository {
  async create(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(correo: string): Promise<IUser | null> {
    return await UserModel.findOne({ correo });
  }

  async findById(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserModel.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserModel.findByIdAndDelete(id);
  }
}
