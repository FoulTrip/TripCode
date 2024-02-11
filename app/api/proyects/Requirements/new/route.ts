import ProjectRequirementService from "@/classes/RequirementsServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProjectRequirement = await ProjectRequirementService.create(data);

    return NextResponse.json({ success: true, data: newProjectRequirement });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
