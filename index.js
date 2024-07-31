import express from "express";

import sequelize from "./db/index.js";
import { userRouter } from "./routers/userRouter.js";
import { productRouter } from "./routers/productRouter.js";
import { categoryRouter } from "./routers/categoryRouter.js";
import { orderRouter } from "./routers/orderRouter.js";


const app = express();
const port = 4000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);


//
//app.use("/orders", orderRouter);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
//app.listen(port, () => console.log(`Server is running on port ${port}`));
