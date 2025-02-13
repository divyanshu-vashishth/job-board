import { getJobs } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobs = await getJobs();
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs", error: error },
      { status: 500 }
    );
  }
}