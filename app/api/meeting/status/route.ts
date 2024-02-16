import MeetingRequestService from "@/classes/MeetingRequestService";
import { NextResponse } from "next/server";

// Endpoint para actualizar `status` de una solicitud de reunión por ID
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const updatedMeetingRequest = await MeetingRequestService.updateStatus(
      id,
      status
    );

    return NextResponse.json(updatedMeetingRequest);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
