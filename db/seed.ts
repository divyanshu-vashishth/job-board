import { db } from './drizzle';
import { jobs, applications, applicationStatusEnum, categoryEnum } from './schema';

async function seed() {
  try {
    // Insert Jobs
    const jobsData = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        description: "We are looking for an experienced Frontend Developer with 5+ years of experience in React and TypeScript. The ideal candidate will have a strong portfolio of web applications and experience with modern frontend tools.",
        positions: 2,
        category: categoryEnum.enumValues['4'],  // Use enum value
        company: "TechCorp Solutions",
        location: "San Francisco, CA",
        created_at: new Date("2024-02-01")
      },
      {
        id: 2,
        title: "DevOps Engineer",
        description: "Join our infrastructure team to build and maintain our cloud-native platform. Experience with AWS, Kubernetes, and CI/CD pipelines is required.",
        positions: 1,
        category: categoryEnum.enumValues['6'],
        company: "CloudScale Inc",
        location: "Remote",
        created_at: new Date("2024-02-05")
      },
      {
        id: 3,
        title: "UX/UI Designer",
        description: "Looking for a creative designer to join our product team. You'll be responsible for creating beautiful, intuitive interfaces for our web and mobile applications.",
        positions: 2,
        category: categoryEnum.enumValues['9'],
        company: "DesignHub",
        location: "New York, NY",
        created_at: new Date("2024-02-10")
      },
      {
        id: 4,
        title: "Frontend Developer",
        description: "Join our fast-growing startup as a Full Stack Developer. Experience with Node.js, React, and PostgreSQL required.",
        positions: 3,
        category: categoryEnum.enumValues['3'],
        company: "StartupX",
        location: "Austin, TX",
        created_at: new Date("2024-02-12")
      },
      {
        id: 5,
        title: "Data Scientist",
        description: "We're seeking a Data Scientist to help us make sense of our growing data. Experience with Python, ML frameworks, and big data technologies is a must.",
        positions: 1,
        category: categoryEnum.enumValues['2'],
        company: "DataDrive Analytics",
        location: "Boston, MA",
        created_at: new Date("2024-02-15")
      }
    ];

    await db.insert(jobs).values(jobsData);

    // Insert Applications
    const applicationsData = [
      {
        id: 1,
        job_id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        resume: "https://storage.example.com/resumes/john-smith.pdf",
        cover_letter: "I am excited to apply for the Senior Frontend Developer position...",
        status: applicationStatusEnum.enumValues['1'],
        created_at: new Date("2024-02-02")
      },
      {
        id: 2,
        job_id: 1,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        resume: "https://storage.example.com/resumes/sarah-johnson.pdf",
        cover_letter: "With 6 years of frontend development experience...",
        status: applicationStatusEnum.enumValues['2'],
        created_at: new Date("2024-02-03")
      },
      {
        id: 3,
        job_id: 2,
        name: "Mike Chen",
        email: "mike.chen@email.com",
        resume: "https://storage.example.com/resumes/mike-chen.pdf",
        cover_letter: "As a DevOps engineer with extensive AWS experience...",
        status: applicationStatusEnum.enumValues['0'],
        created_at: new Date("2024-02-06")
      },
      {
        id: 4,
        job_id: 3,
        name: "Emily Davis",
        email: "emily.d@email.com",
        resume: "https://storage.example.com/resumes/emily-davis.pdf",
        cover_letter: "I've attached my portfolio showcasing my UX/UI work...",
        status: applicationStatusEnum.enumValues['3'],
        created_at: new Date("2024-02-11")
      },
      {
        id: 5,
        job_id: 3,
        name: "Alex Wong",
        email: "alex.w@email.com",
        resume: "https://storage.example.com/resumes/alex-wong.pdf",
        cover_letter: "I bring 4 years of experience in product design...",
        status: applicationStatusEnum.enumValues['0'],
        created_at: new Date("2024-02-12")
      },
      {
        id: 6,
        job_id: 4,
        name: "Lisa Brown",
        email: "lisa.brown@email.com",
        resume: "https://storage.example.com/resumes/lisa-brown.pdf",
        cover_letter: "I'm excited about the opportunity to join StartupX...",
        status: applicationStatusEnum.enumValues['4'],
        created_at: new Date("2024-02-13")
      },
    ];

    await db.insert(applications).values(applicationsData);

    console.log("✅ Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
}

// Execute the seed function
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });