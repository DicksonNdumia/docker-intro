import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./user.sql.ts";
import { category } from "./category.sql.ts";
import { relations } from "drizzle-orm";
import { postTags } from "./postTags.sql.ts";
import { comment } from "./comment.sql.ts";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  title: varchar("title", { length: 255 }).notNull(),
  shortDescription: text("short_description"),
  content: text("content").notNull(),
  categoryId: integer("category_id")
    .references(() => category.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
  tags: many(postTags),
  comments: many(comment),
  category: one(category, {
    fields: [post.categoryId],
    references: [category.id],
  }),
}));

export const postSchema = createInsertSchema(post);
export type CategorySchema = z.infer<typeof postSchema>;
