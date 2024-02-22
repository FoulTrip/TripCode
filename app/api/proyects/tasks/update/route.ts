import TaskService from "@/classes/TaskServices";
import { ScalarTask } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { taskId, taskData } = await req.json();
    const updatedTask = await TaskService.update(taskId, taskData);

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
