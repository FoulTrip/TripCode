import ProjectService from "@/classes/ProjectService";
import { ScalarProject } from "@/types/Schema";
import { NextResponse } from "next/server";

// Endpoint para actualizar un proyecto por ID
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    const projectData: ScalarProject = await req.json();
    const updatedProject = await ProjectService.update(id, projectData);

    return NextResponse.json(updatedProject);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
