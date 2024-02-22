import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { projectId } = await req.json();
    const updatedProject = await ProjectService.removeRepositoryId(projectId);

    if (!projectId) {
      throw new Error("Falta parametro [projectId]");
    }

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
