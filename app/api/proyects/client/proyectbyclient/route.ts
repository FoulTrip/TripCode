import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

// Endpoint para obtener proyectos por ID de cliente
export async function POST(req: Request) {
  try {
    const { clientId } = await req.json();
    const projects = await ProjectService.getProjectsByClientId(clientId);

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
