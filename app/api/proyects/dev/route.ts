import { NextRequest, NextResponse } from "next/server";
import ProjectService from "@/classes/ProjectService";

// Endpoint para agregar un SoftwareEngineer a un Proyecto
export async function POST(req: NextRequest) {
  try {
    const { projectId, softwareEngineerId } = await req.json();

    const updatedProject = await ProjectService.addSoftwareEngineerToProject(
      projectId,
      softwareEngineerId
    );

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
