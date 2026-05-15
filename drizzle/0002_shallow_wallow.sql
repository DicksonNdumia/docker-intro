CREATE TYPE "public"."userRole" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "userData" ADD COLUMN "age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "userData" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "userData" ADD COLUMN "userRole" "userRole" DEFAULT 'user' NOT NULL;--> statement-breakpoint
CREATE INDEX "emailIndex" ON "userData" USING btree ("email");--> statement-breakpoint
ALTER TABLE "userData" ADD CONSTRAINT "userData_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "userData" ADD CONSTRAINT "uniqueNameAndAge" UNIQUE("age","name");