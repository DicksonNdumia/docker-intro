import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const myTable = pgTable("Data", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});
