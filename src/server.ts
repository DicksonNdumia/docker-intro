import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error/error.handler.ts";
import { myLogger } from "./middleware/log/isLogged.ts";
import { db } from "./config/config.db.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(myLogger);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
