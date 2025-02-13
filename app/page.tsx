import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Job Board</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/candidate/jobs">I&apos;m a Candidate</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/company/jobs">I&apos;m a Company</Link>
        </Button>
      </div>
    </div>
  )
}

