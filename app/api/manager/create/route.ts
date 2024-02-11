import ProjectManagerServices from "@/classes/ProjectManagerService";
import { ScalarProjectManager } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      firstname,
      lastname,
      password,
      email,
      avatar,
      phone,
    }: ScalarProjectManager = await req.json();

    const newClient = await ProjectManagerServices.create({
      firstname,
      lastname,
      password,
      email,
      phone,
      avatar,
    });

    return NextResponse.json({ success: true, data: newClient });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
