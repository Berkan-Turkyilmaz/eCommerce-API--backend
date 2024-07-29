import express from "express";
import { orderRouter } from "./routers/postRouter.js";

const app = express();
const port = 5000;

app.use(express.jason());

app.use("/orders", orderRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
