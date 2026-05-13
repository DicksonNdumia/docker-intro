import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "../src/config/schema/schema.sql.ts";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "John@email.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New User inserted");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");
  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log("User deleted!");
}

main();
