import ProjectRequirementService from "@/classes/RequirementsServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projectRequirements = await ProjectRequirementService.getAll();

    return NextResponse.json({ success: true, data: projectRequirements });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
