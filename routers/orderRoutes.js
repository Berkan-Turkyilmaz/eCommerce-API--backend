import express from "express";
import {
  getOrder,
  createOrder,
  getOrderById,
  updateOrder,
  deleteorder,
} from "../controllers/orders.js";

export const orderRouter = express.Router();

orderRouter.get("/", getOrder);
orderRouter.post("/", createOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteorder);
