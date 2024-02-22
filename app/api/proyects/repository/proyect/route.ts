import RepositoryDetailService from "@/classes/RepositoryServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const repositoryDetail = await RepositoryDetailService.getByProjectId(id);

    return NextResponse.json({ success: true, data: repositoryDetail });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
