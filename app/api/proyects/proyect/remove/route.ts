import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

// Endpoint para eliminar un proyecto por ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deletedProject = await ProjectService.delete(id);

    return NextResponse.json(deletedProject);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
