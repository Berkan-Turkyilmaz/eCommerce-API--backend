import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";
import express from "express";


export const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
