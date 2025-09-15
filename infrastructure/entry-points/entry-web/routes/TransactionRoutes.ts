import { Router } from "express";
import { TransactionController } from "@controllers/TransactionController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/transactions", verifyToken, TransactionController.create);
router.get("/transactions", verifyToken, TransactionController.list);
router.put("/transactions/:id", verifyToken, TransactionController.update);
router.delete("/transactions/:id", verifyToken, TransactionController.delete);

export default router;
