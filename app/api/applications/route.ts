import { submitApplication } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const applicationData = await req.json();
    const newApplication = await submitApplication(applicationData);
    return NextResponse.json({ application: newApplication }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { message: "Failed to submit application", error: error },
      { status: 500 }
    );
  }
}