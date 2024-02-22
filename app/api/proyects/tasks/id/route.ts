import TaskService from "@/classes/TaskServices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { taskId } = await req.json();
    const task = await TaskService.get(taskId);

    if (task) {
      return NextResponse.json(task);
    } else {
      return NextResponse.json({ error: "Task not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
