ALTER TABLE "applications" DROP CONSTRAINT "applications_job_id_jobs_id_fk";
--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "applications" ALTER COLUMN "cover_letter" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "positions" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "company" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "location" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "public"."jobs" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category";--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('Software Developer', 'QA Engineer', 'Data Scientist', 'UX Designer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Devops Engineer', 'Junior Developer', 'Entry Level Developer', 'Junior QA', 'QA Engineer', 'QA Manager', 'QA Analyst', 'QA Tester');--> statement-breakpoint
ALTER TABLE "public"."jobs" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";--> statement-breakpoint
DROP TYPE "public"."application_status";