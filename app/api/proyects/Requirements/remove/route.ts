import ProjectRequirementService from "@/classes/RequirementsServices";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deletedProjectRequirement = await ProjectRequirementService.delete(
      id as string
    );

    return NextResponse.json({
      success: true,
      data: deletedProjectRequirement,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
