import express from "express";
import userRouter from "./routers/userRoutes.js";
import sequelize from "./db/index.js";
//
//import { orderRouter } from "./routers/orderRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/users", userRouter);

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
