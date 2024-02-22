import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const updatedProject = await ProjectService.removeProjectManagerFromProject(
      id
    );

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
