import { db } from '@/db/drizzle'
import { jobs, applications } from '@/db/schema'
import { categoryEnum } from '@/db/schema'

const jobSeedData = [
  {
    title: 'Frontend Developer',
    description: 'Looking for a skilled frontend developer to join our team.',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    category: categoryEnum.enumValues[0], // 'Frontend'
    positions: 2,
  },
  {
    title: 'Backend Engineer',
    description: 'We are hiring a backend engineer with Node.js experience.',
    company: 'Global Solutions Ltd.',
    location: 'New York, NY',
    category: categoryEnum.enumValues[1], // 'Backend'
    positions: 3,
  },
  {
    title: 'Full Stack Developer',
    description: 'Join us as a full stack developer and work on exciting projects.',
    company: 'Creative Software Corp.',
    location: 'London, UK',
    category: categoryEnum.enumValues[2], // 'FullStack'
    positions: 1,
  },
  {
    title: 'Data Analyst',
    description: 'Seeking a data analyst to help us make data-driven decisions.',
    company: 'Analytics Pro',
    location: 'Chicago, IL',
    category: categoryEnum.enumValues[3], // 'Data Analytics'
    positions: 2,
  },
  {
    title: 'HR Manager',
    description: 'We are looking for an experienced HR manager to lead our HR department.',
    company: 'People First Co.',
    location: 'Austin, TX',
    category: categoryEnum.enumValues[4], // 'Human Resource'
    positions: 1,
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