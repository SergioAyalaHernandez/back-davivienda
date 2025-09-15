import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://ismaelhernandezaws9208_db_user:xG0zqikohl9qHze5@cluster0.g5ujblw.mongodb.net/finance-davivienda?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
