import * as p from "drizzle-orm/pg-core";

export const usersTable = p.pgTable("users", {
  id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: p.varchar().notNull(),
  age: p.integer().notNull(),
  email: p.varchar().notNull().unique(),
});
