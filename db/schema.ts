import { pgEnum, pgTable, serial, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core';

export const categoryEnum = pgEnum('category', [
  'Software Developer',
  'QA Engineer',
  'Data Scientist',
  'UX Designer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Devops Engineer',
  'Junior Developer',
  'Entry Level Developer',
  'Junior QA',
  'QA Manager',
  'QA Analyst',
  'QA Tester'
]);

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  category: categoryEnum(),
  positions: integer('positions').notNull().default(1),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  job_id: integer('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  resume: text('resume').notNull(),
  cover_letter: text('cover_letter'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;