import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { post } from "./post.sql";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

//making sure that a category can get related data and tables e.g the post table
export const categoryRelations = relations(category, ({ many }) => ({
  posts: many(post),
}));

//Validation
export const categorySchema = createInsertSchema(category);
export type CategorySchema = z.infer<typeof categorySchema>;
