import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const updatedProject = await ProjectService.updateStatus(id, status);

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
