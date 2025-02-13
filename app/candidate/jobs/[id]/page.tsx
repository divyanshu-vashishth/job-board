import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getJobById } from "@/lib/actions"
type Params = Promise<{ id: string }>
export default async function JobDetails({ params }: { params: Params }) {
  const params_id = await params

  
  const job = await getJobById(parseInt(params_id.id))

  if (!job) {
    return <div>Job not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{job.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl mb-4">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="mb-2">
          <strong>Category:</strong> {job.category}
        </p>
        <p className="mb-2">
          <strong>Positions:</strong> {job.positions}
        </p>
        <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
        <p className="mb-4">{job.description}</p>
        <Button asChild>
          <Link href={`/candidate/apply/${params_id.id}`}>Apply Now</Link>
        </Button>
      </div>
    </div>
  )
}

