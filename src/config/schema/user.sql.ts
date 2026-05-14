import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { post } from "./post.sql";
import { comment } from "./comment.sql";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const user = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
//making sure that a user can get related data and tables e.g the post table
export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
  comments: many(comment),
}));

export const userSchema = createInsertSchema(user);
export type CategorySchema = z.infer<typeof userSchema>;
