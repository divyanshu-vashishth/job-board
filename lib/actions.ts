'use server'

import { db } from '@/db/drizzle'
import { jobs, applications, type NewJob, type NewApplication } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getJobs() {
  try {
    const allJobs = await db.select().from(jobs).orderBy(jobs.created_at)
    return allJobs
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    throw new Error('Failed to fetch jobs')
  }
}

export async function getJobById(id: number) {
  try {
    const job = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1)
    return job[0]
  } catch (error) {
    console.error('Failed to fetch job:', error)
    throw new Error('Failed to fetch job')
  }
}

export async function createJob(job: NewJob) {
  try {
    const newJob = await db.insert(jobs).values(job).returning()
    revalidatePath('/company/jobs')
    revalidatePath('/candidate/jobs')
    return newJob[0]
  } catch (error) {
    console.error('Failed to create job:', error)
    throw new Error('Failed to create job')
  }
}

export async function updateJob(id: number, job: Partial<NewJob>) {
  try {
    const updatedJob = await db
      .update(jobs)
      .set({ ...job, updated_at: new Date() })
      .where(eq(jobs.id, id))
      .returning()
    revalidatePath('/company/jobs')
    revalidatePath('/candidate/jobs')
    revalidatePath(`/company/jobs/${id}`)
    return updatedJob[0]
  } catch (error) {
    console.error('Failed to update job:', error)
    throw new Error('Failed to update job')
  }
}

export async function deleteJob(id: number) {
  try {
    await db.delete(jobs).where(eq(jobs.id, id))
    revalidatePath('/company/jobs')
    revalidatePath('/candidate/jobs')
  } catch (error) {
    console.error('Failed to delete job:', error)
    throw new Error('Failed to delete job')
  }
}

export async function applyForJob(jobId: number, application: NewApplication) {
  try {
    const newApplication = await db.insert(applications).values(application).returning()
    revalidatePath(`/company/jobs/${jobId}/applications`)
    return newApplication[0]
  } catch (error) {
    console.error('Failed to submit application:', error)
    throw new Error('Failed to submit application')
  }
}

export async function getApplicationsForJob(jobId: number) {
  try {
    const jobApplications = await db
      .select()
      .from(applications)
      .where(eq(applications.job_id, jobId))
      .orderBy(applications.created_at)
    return jobApplications
  } catch (error) {
    console.error('Failed to fetch applications:', error)
    throw new Error('Failed to fetch applications')
  }
}