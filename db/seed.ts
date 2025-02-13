import { db } from '@/db/drizzle'
import { jobs, applications } from '@/db/schema'
import { categoryEnum } from '@/db/schema'

const jobSeedData = [
  {
    title: 'Frontend Developer',
    description: 'Looking for a skilled frontend developer to join our team.',
    company: 'Tech Innovations Inc.',
    location: 'USA',
    category: categoryEnum.enumValues[0], 
    positions: 2,
    salary_min: 80000,
    salary_max: 120000,
  },
  {
    title: 'Backend Engineer',
    description: 'We are hiring a backend engineer with Node.js experience.',
    company: 'Global Solutions Ltd.',
    location: 'UK',
    category: categoryEnum.enumValues[1], 
    positions: 3,
    salary_min: 75000,
    salary_max: 110000,
  },
  {
    title: 'Full Stack Developer',
    description: 'Join us as a full stack developer and work on exciting projects.',
    company: 'Creative Software Corp.',
    location: 'Canada',
    category: categoryEnum.enumValues[2], 
    positions: 1,
    salary_min: 90000,
    salary_max: 130000
  },
  {
    title: 'Data Analyst',
    description: 'Seeking a data analyst to help us make data-driven decisions.',
    company: 'Analytics Pro',
    location: 'India',
    category: categoryEnum.enumValues[3], 
    positions: 2,
    salary_min: 70000,
    salary_max: 100000,
  },
  {
    title: 'HR Manager',
    description: 'We are looking for an experienced HR manager to lead our HR department.',
    company: 'People First Co.',
    location: 'India',
    category: categoryEnum.enumValues[4], 
    positions: 1,
    salary_min: 60000,
    salary_max: 90000,
  },
]

const applicationSeedData = [
  {
    job_id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    resume: 'https://example.com/resume/john_doe',
    cover_letter: 'Enthusiastic frontend developer...',
  },
  {
    job_id: 1,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    resume: 'https://example.com/resume/jane_smith',
    cover_letter: 'Passionate about frontend development...',
  },
  {
    job_id: 2,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    resume: 'https://example.com/resume/alice_johnson',
    cover_letter: 'Experienced backend engineer...',
  },
]

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...')

    // Insert jobs
    for (const job of jobSeedData) {
      await db.insert(jobs).values(job)
    }
    console.log('✅ Jobs seeded successfully.')

    // Insert applications
    for (const application of applicationSeedData) {
      await db.insert(applications).values(application)
    }
    console.log('✅ Applications seeded successfully.')

    console.log('🌱 Database seeding complete.')
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
  }
}

// To run the seed function when this file is executed
seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  }) 