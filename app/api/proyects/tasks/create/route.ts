import TaskService from "@/classes/TaskServices";
import { ScalarTask } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const taskData: ScalarTask = await req.json();
    const newTask = await TaskService.create(taskData);

    return NextResponse.json(newTask);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
