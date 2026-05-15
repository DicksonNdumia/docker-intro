import "dotenv/config";

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error/error.handler.ts";
import { myLogger } from "./middleware/log/isLogged.ts";
import { db } from "./config/config.db.ts";
import { myTable } from "./config/schema/schema.sql.ts";
import { userTable } from "./config/schema/userData.sql.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(myLogger);
app.use(errorHandler);

const PORT = 3000;

async function main() {
  await db.insert(userTable).values({
    name: "Kyle",
  });
  const user = await db.query.userTable.findFirst();
  console.log(user);
}

main();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
