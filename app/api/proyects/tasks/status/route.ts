import TaskService from "@/classes/TaskServices";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { taskId, status } = await req.json();
    const updatedTask = await TaskService.updateStatus(taskId, status);

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
