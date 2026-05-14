import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { post } from "./post.sql";
import { tag } from "./tag.sql";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const postTags = pgTable(
  "post_to_tag",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => post.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.tagId] }),
  }),
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
  tag: one(tag, { fields: [postTags.tagId], references: [tag.id] }),
  post: one(post, { fields: [postTags.postId], references: [post.id] }),
}));

export const postTagSchema = createInsertSchema(postTags);
export type CategorySchema = z.infer<typeof postTagSchema>;
