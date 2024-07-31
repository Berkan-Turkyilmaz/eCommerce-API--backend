import express from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
  
} from "../controllers/orders.js";

export const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);
