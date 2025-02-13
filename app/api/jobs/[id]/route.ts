import { getJobById } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }
    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return NextResponse.json(
      { message: "Error fetching job by ID", error: error },
      { status: 500 }
    );
  }
}