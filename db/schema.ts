import { relations } from "drizzle-orm";
import { integer, text, pgTable, pgEnum , timestamp } from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  'Software Developer',
  'QA Engineer',
  'Data Scientist',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'Technical Writer',
  'Designer',
  'UX Designer',
  'Product Manager',
  'Marketing Specialist',
  'Business Analyst',
  'Sales Engineer',
  'Project Manager',
]);
export const applicationStatusEnum = pgEnum('application_status', [
  'pending',
  'reviewing',
  'interviewed',
  'rejected',
  'accepted',
]);
export const jobs = pgTable("jobs", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description : text("description").notNull(),
  positions : integer("positions").notNull(),
  category : categoryEnum(),
  company : text("company").notNull(),
  location : text("location").notNull(),
  created_at : timestamp("created_at").notNull().defaultNow(),

});


export const applications = pgTable("applications", {
  id: integer("id").primaryKey(),
  job_id : integer("job_id").references(()=> jobs.id).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  resume : text("resume").notNull(),
  cover_letter : text("cover_letter").notNull(),
  status : applicationStatusEnum().default('pending').notNull(),
  created_at : timestamp("created_at").notNull().defaultNow()
 
});
export const job_relations = relations(jobs, ({many}) => ({
  applications: many(applications)
}));

export const application_relations = relations(applications, ({one}) => ({
  job: one(jobs,{
    fields:[applications.job_id],
    references:[jobs.id]
  }),
}));
