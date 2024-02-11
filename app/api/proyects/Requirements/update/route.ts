import ProjectRequirementService from "@/classes/RequirementsServices";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, data } = await req.json();
    const updatedProjectRequirement = await ProjectRequirementService.update(
      id,
      data
    );

    return NextResponse.json({
      success: true,
      data: updatedProjectRequirement,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
