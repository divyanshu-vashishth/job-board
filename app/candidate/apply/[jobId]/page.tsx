"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { applyForJob } from "@/lib/actions";
import { useParams } from 'next/navigation'
import { toast } from "sonner";

export default function ApplyJob() {
  const params = useParams<{ jobId: string }>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      await applyForJob(parseInt(params.jobId), {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        resume: formData.get("resumeLink") as string,
        cover_letter: formData.get("coverLetter") as string,
        job_id: parseInt(params.jobId),
      });
      toast.success("Application submitted successfully")
      router.push(`/candidate/jobs`);
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message)

      }
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Apply for Position</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="resumeLink">Resume Link</Label>
          <Input id="resumeLink" name="resumeLink" type="url" required />
        </div>
        <div>
          <Label htmlFor="coverLetter">Cover Letter</Label>
          <Textarea id="coverLetter" name="coverLetter" required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}

