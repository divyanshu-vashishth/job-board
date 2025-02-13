import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-gray-800">
          Job Board
        </Link>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/candidate/jobs">Find a Job</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/company/jobs">Hire Talent</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 