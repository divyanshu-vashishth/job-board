"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { categoryEnum, type Job } from "@/db/schema"

export default function CandidateJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>("")
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [salaryRange, setSalaryRange] = useState<string | null>("");
  const [locationFilter, setLocationFilter] = useState<string | null>("");
  const fetchJobs = async () => {
    const response = await fetch('/api/jobs', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs')
    }
    const results = await response.json()
    setAllJobs(results.jobs);
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    const filteredJobs = allJobs.filter(job => {
      const searchMatch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());
      const categoryMatch = category ? job.category === category : true;
      // {{ Add salary range filter logic }}
      const salaryMatch = salaryRange ?
        (salaryRange === "50k-" && (job.salary_min !== null && job.salary_min <= 50000)) ||
        (salaryRange === "50k-100k" && (job.salary_min !== null && job.salary_min >= 50000 && job.salary_max !== null && job.salary_max <= 100000)) ||
        (salaryRange === "100k+" && (job.salary_max !== null && job.salary_max >= 100000))
        : true;
      // {{ Add location filter logic }}
      const locationMatch = locationFilter ? job.location === locationFilter : true;
      return searchMatch && categoryMatch && salaryMatch && locationMatch;
    });
    setJobs(filteredJobs);
  }, [search, category, allJobs, salaryRange, locationFilter]);
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-bold">Available Jobs</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select onValueChange={(value) => setCategory(value)} value={category ?? ""}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>All Categories</SelectItem>
              {categoryEnum.enumValues.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Add Salary Range Filter  */}
          <Select onValueChange={(value) => setSalaryRange(value)} value={salaryRange ?? ""}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by salary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>All Salaries</SelectItem>
              <SelectItem value="50k-">Less than 50k</SelectItem>
              <SelectItem value="50k-100k">50k - 100k</SelectItem>
              <SelectItem value="100k+">100k+ </SelectItem>
            </SelectContent>
          </Select>
          {/* Add Location Filter */}
          <Select onValueChange={(value) => setLocationFilter(value)} value={locationFilter ?? ""}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={null}>All Locations</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="UK">UK</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="India">India</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm font-medium mt-2">{job.category}</p>
              {job.salary_min !== null && job.salary_max !== null && (
                <p className="text-sm text-gray-600 mt-2">
                  Salary: ${job.salary_min} - ${job.salary_max}
                </p>)}
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

