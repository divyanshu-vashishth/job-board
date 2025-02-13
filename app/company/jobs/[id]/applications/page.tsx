import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getApplicationsForJob } from "@/lib/actions"

type Params = Promise<{
  id: string
}>

export default async function JobApplications({ params }: { params: Params }) {
  const params_id = await params
  const applications = await getApplicationsForJob(parseInt(params_id.id))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Applications for Job ID: {params_id.id}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </TableCell>
              <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

