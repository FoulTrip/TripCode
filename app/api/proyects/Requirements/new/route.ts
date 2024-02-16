import ProjectRequirementService from "@/classes/RequirementsServices";
import { ProjectRequirement } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { requirement, meetingRequestId, projectId }: ProjectRequirement =
      await req.json();

    const data = {
      requirement,
      meetingRequestId,
      projectId,
    };

    const newProjectRequirement = await ProjectRequirementService.create(data);

    return NextResponse.json({ success: true, data: newProjectRequirement });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
