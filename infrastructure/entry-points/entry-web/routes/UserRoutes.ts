import {Router} from "express";

import {UserController} from "@controllers/UserController";
import { verifyToken } from "../middleware/auth";
import { requireAdmin } from "../middleware/role";


const router = Router();

router.post("/users", UserController.createUser);

router.get("/users", verifyToken, requireAdmin, UserController.getAllUsers);
router.get("/users/:id", verifyToken, requireAdmin, UserController.getUserById);
router.put("/users/:id", verifyToken, requireAdmin, UserController.updateUser);
router.delete("/users/:id", verifyToken, requireAdmin, UserController.deleteUser);

export default router;
