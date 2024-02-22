import RepositoryDetailService from "@/classes/RepositoryServices";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, data } = await req.json();
    const updatedRepositoryDetail = await RepositoryDetailService.update(
      id,
      data
    );

    return NextResponse.json({ success: true, updatedRepositoryDetail });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
