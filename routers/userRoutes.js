import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();
// Get all users
userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);

export default userRouter;
