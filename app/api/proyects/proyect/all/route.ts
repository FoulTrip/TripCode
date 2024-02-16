import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

// Endpoint para obtener todos los proyectos
export async function GET(req: Request) {
  try {
    const projects = await ProjectService.getAll();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
