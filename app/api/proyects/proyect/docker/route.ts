import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    const { dockerized } = await req.json();
    const updatedProject = await ProjectService.updateDockerized(
      id,
      dockerized
    );

    return NextResponse.json(updatedProject);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
