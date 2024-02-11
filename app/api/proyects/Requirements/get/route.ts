import ProjectRequirementService from "@/classes/RequirementsServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const projectRequirement = await ProjectRequirementService.get(
      id as string
    );

    return NextResponse.json({ success: true, data: projectRequirement });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
