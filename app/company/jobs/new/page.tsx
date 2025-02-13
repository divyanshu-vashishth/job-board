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
    category: "Software Developer",
    location: "",
    positions: 1,
    company: "",
  })
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createJob({
        ...formData,
        category: formData.category as any,
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
            <SelectItem value={categoryEnum.enumValues[0]}>Software Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[1]}>QA Engineer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[2]}>Data Scientist</SelectItem>
            <SelectItem value={categoryEnum.enumValues[6]}>Full Stack Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[4]}>Frontend Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[5]}>Backend Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[3]}>UX Designer</SelectItem>  
            <SelectItem value={categoryEnum.enumValues[7]}>Devops Engineer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[8]}>Junior Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[9]}>Entry Level Developer</SelectItem>
            <SelectItem value={categoryEnum.enumValues[10]}>Junior QA</SelectItem>
            <SelectItem value={categoryEnum.enumValues[12]}>QA Manager</SelectItem>
            <SelectItem value={categoryEnum.enumValues[13]}>QA Analyst</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <Button type="submit">Post Job</Button>
      </form>
    </div>
  )
}

