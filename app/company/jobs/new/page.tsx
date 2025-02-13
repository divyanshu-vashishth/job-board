"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJob } from "@/lib/actions"
import { categoryEnum } from "@/db/schema"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categoryEnum.enumValues[0],
    location: "",
    positions: 1,
    company: "",
    salary_min: 0,
    salary_max: 0,
  })
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createJob({
        ...formData,
        category: formData.category,
      })
      toast.success("Job posted successfully")
      router.push("/company/jobs")
    } catch (error) {
      console.error("Error posting job:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Job Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="positions">Number of Positions</Label>
          <Input 
            id="positions" 
            name="positions" 
            type="number" 
            min="1"
            value={formData.positions} 
            onChange={(e) => setFormData(prev => ({ ...prev, positions: parseInt(e.target.value) }))} 
            required 
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={handleSelectChange("category")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryEnum.enumValues.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="country">Country</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="salary_min">Salary Min</Label>
          <Input id="salary_min" name="salary_min" value={formData.salary_min} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="salary_max">Salary Max</Label>
          <Input id="salary_max" name="salary_max" value={formData.salary_max} onChange={handleChange} required />
        </div>
        <Button type="submit">Post Job</Button>
      </form>
    </div>
  )
}

