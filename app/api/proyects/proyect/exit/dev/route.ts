import ProjectService from "@/classes/ProjectService";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id, engineerId } = await req.json();

    if (!id) {
      throw new Error("Missing [id] parameter");
    }
    const updatedProject =
      await ProjectService.removeSoftwareEngineerFromProject(id, engineerId);

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
