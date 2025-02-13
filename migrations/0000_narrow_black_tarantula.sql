CREATE TYPE "public"."application_status" AS ENUM('pending', 'reviewing', 'interviewed', 'rejected', 'accepted');--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('Software Developer', 'QA Engineer', 'Data Scientist', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Project Manager', 'Technical Writer', 'Designer', 'UX Designer', 'Product Manager', 'Marketing Specialist', 'Business Analyst', 'Sales Engineer', 'Project Manager');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" integer PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"resume" text NOT NULL,
	"cover_letter" text NOT NULL,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"positions" integer NOT NULL,
	"category" "category",
	"company" text NOT NULL,
	"location" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;