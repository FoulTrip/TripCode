import MeetingRequestService from "@/classes/MeetingRequestService";
import { NextResponse } from "next/server";

// Endpoint para actualizar `managerId` de una solicitud de reunión por ID
export async function PUT(req: Request) {
  try {
    const { id, managerId } = await req.json();
    const updatedMeetingRequest = await MeetingRequestService.updateManagerId(
      id,
      managerId
    );

    return NextResponse.json(updatedMeetingRequest);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
