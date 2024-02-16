import MeetingRequestService from "@/classes/MeetingRequestService";
import { NextResponse } from "next/server";

// Endpoint para actualizar `timestamp` de una solicitud de reunión por ID
export async function PUT_MeetingRequestTimestamp(req: Request) {
  try {
    const { id, timestamp } = await req.json();
    const updatedMeetingRequest = await MeetingRequestService.updateTimestamp(
      id,
      timestamp
    );

    return NextResponse.json(updatedMeetingRequest);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
