import TaskService from "@/classes/TaskServices";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { taskId } = await req.json();
    const deletedTask = await TaskService.delete(taskId);

    return NextResponse.json({ success: true, data: deletedTask });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
