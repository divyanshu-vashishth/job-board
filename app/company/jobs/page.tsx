import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getJobs, deleteJob } from "@/lib/actions"
import { toast } from "sonner"

export default async function CompanyJobs() {
  const jobs = await getJobs()

  const handleDelete = async (id: number) => {
    "use server"
    try {
      await deleteJob(id)
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message)
      }
      toast.error("Failed to delete job")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Dashboard</h1>
        <Button asChild>
          <Link href="/company/jobs/new">Post a New Job</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Date Posted</TableHead>
            <TableHead>Edit Actions</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell> <Button asChild variant="outline" className="mr-2">
                  <Link href={`/company/jobs/${job.id}/applications`}>View Applications</Link>
                </Button></TableCell>
              <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/company/jobs/${job.id}/edit`}>Edit</Link>
                </Button>
              </TableCell>
              <TableCell>
              <form action={handleDelete.bind(null, job.id)}>
                  <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

