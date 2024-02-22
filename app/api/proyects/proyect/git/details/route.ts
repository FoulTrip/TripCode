import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { projectId, repositoryId } = await req.json();
    const updatedProject = await ProjectService.updateRepositoryId(
      projectId,
      repositoryId
    );

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
