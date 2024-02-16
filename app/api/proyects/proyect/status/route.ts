import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

// Endpoint para actualizar el estado de un proyecto por ID
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const updatedProject = await ProjectService.updateStatus(id, status);

    return NextResponse.json(updatedProject);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
