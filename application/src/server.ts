import express, { Application, Request, Response } from "express";
import userRoutes from "../../infrastructure/entry-points/entry-web/routes/UserRoutes";
import authRoutes from "../../infrastructure/entry-points/entry-web/routes/AuthRoutes";
import transactionsRoutes from "../../infrastructure/entry-points/entry-web/routes/TransactionRoutes";
import { connectDB } from "@db/mongo-connection";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", transactionsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Proyecto Clean Architecture con TypeScript 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ No se pudo conectar a MongoDB:", error);
    process.exit(1);
  }
};

startServer();
