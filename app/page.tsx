import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
    <section className="bg-gradient-to-br min-h-[80vh] flex flex-col items-center justify-center from-blue-200 to-purple-200 py-20 px-6 md:px-24">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Find Your Dream Job or Hire Top Talent
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Connecting candidates with great companies and helping businesses
          find their next star employees.
        </p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary">
            Get Started 
          </Button>
        </div>
      </div>
    </section>
    <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Job Board. All rights reserved.</p>
        </div>
      </footer>
      </div>
  )
}

