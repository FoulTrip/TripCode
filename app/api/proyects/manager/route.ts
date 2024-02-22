import { NextRequest, NextResponse } from "next/server";
import ProjectService from "@/classes/ProjectService";
import { pubsub } from "../../ws/route";

// Endpoint for adding a Product Manager to a Project
export async function POST(req: NextRequest) {
  try {
    const { projectId, productManagerId } = await req.json();

    console.log(projectId, productManagerId);

    const updatedProject = await ProjectService.addProductManagerToProject(
      projectId,
      productManagerId
    );

    console.log(updatedProject);

    const eventName = `newProjectManager_${projectId}`;
    
    pubsub.emit(
      eventName,
      `Se agregó un nuevo Project Manager: ${productManagerId} al proyecto: ${projectId}`
    );

    pubsub.on(eventName, (data) => {
      console.log(`Evento ${eventName} emitido con datos: ${data}`);
    });

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
