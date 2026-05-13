import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error/error.handler.ts";
import { myLogger } from "./middleware/log/isLogged.ts";
import { db } from "./config/config.db.ts";
import { usersTable } from "../src/config/schema/schema.sql.ts";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(myLogger);
app.use(errorHandler);

const PORT = 3000;

app.get("/", async (req, res) => {
  const result = await db.select().from(usersTable);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
