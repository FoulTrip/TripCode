// Import necessary modules and dependencies
import ProjectService from "@/classes/ProjectService"; // Adjust the import path accordingly
import { NextResponse } from "next/server";

// Endpoint to get all projects where a Software Engineer ID is involved
export async function POST(req: Request) {
  try {
    const { softwareEngineerId } = await req.json();

    if (!softwareEngineerId) {
      throw new Error("Software Engineer ID is required");
    }

    const projects = await ProjectService.getProjectsBySoftwareEngineerId(
      softwareEngineerId
    );

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
