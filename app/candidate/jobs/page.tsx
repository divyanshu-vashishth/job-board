import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getJobs } from "@/lib/actions"
import { categoryEnum } from "@/db/schema"
export default async function CandidateJobs() {
  const jobs = await getJobs()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="flex gap-4 mb-6">
        <Input placeholder="Search jobs..." className="max-w-sm" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={categoryEnum.enumValues[0]}>Software Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[1]}>Product Manager</SelectItem>
            <SelectItem value={categoryEnum.enumValues[2]}>Data Scientist</SelectItem>
            <SelectItem value={categoryEnum.enumValues[3]}>UX Designer</SelectItem>  
            <SelectItem value={categoryEnum.enumValues[4]}>Frontend Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[5]}>Backend Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[6]}>Full Stack Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[7]}>Senior Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[8]}>Junior Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[9]}>Entry Level Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[10]}>Junior QA</SelectItem>
            <SelectItem value={categoryEnum.enumValues[11]}>QA Engineer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[12]}>QA Manager</SelectItem>
            <SelectItem value={categoryEnum.enumValues[13]}>QA Analyst</SelectItem>
            {/* <SelectItem value="product">Frontend Developer</SelectItem>
            <SelectItem value="data-science">Data Science</SelectItem> */}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="noida">Noida</SelectItem>
            <SelectItem value="banglore">Banglore</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Salary Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50k">$0 - $20k</SelectItem>
            <SelectItem value="50k-100k">$20k - $50k</SelectItem>
            <SelectItem value="100k+">$50k+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Category:</strong> {job.category}
              </p>
              <p>
                <strong>Salary:</strong> {job.positions}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/candidate/jobs/${job.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

