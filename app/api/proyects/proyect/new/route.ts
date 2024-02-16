import ProjectService from "@/classes/ProjectService";
import { ScalarProject } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const projectData: ScalarProject = await req.json();
    const newProject = await ProjectService.create(projectData);

    return NextResponse.json(newProject);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
