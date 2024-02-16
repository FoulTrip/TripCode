import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

// Endpoint para obtener un proyecto por ID
export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    console.log(id)
    const project = await ProjectService.get(id);

    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
