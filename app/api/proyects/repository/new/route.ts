import RepositoryDetailService from "@/classes/RepositoryServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const repositoryDetailData = await req.json();
    const newRepositoryDetail = await RepositoryDetailService.create(
      repositoryDetailData
    );

    return NextResponse.json({ success: true, data: newRepositoryDetail });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
