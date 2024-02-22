import TaskService from "@/classes/TaskServices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { projectId } = await req.json();
    const tasks = await TaskService.getAllTasksByProjectId(projectId);

    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
