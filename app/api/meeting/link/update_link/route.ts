import MeetingRequestService from "@/classes/MeetingRequestService";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, meetingLink } = await req.json();
    const updatedMeetingRequest = await MeetingRequestService.updateMeetingLink(
      id,
      meetingLink
    );

    return NextResponse.json(updatedMeetingRequest);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
