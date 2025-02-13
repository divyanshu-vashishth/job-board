ALTER TABLE "jobs" ALTER COLUMN "category" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."jobs" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category";--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('Frontend', 'Backend', 'FullStack', 'Data Analytics', 'Human Resource');--> statement-breakpoint
ALTER TABLE "public"."jobs" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";