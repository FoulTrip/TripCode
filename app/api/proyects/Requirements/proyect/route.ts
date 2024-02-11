import ProjectRequirementService from "@/classes/RequirementsServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();
    const projectRequirements = await ProjectRequirementService.getByProject(
      projectId
    );

    return NextResponse.json({ success: true, data: projectRequirements });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
