import PaymentService from "@/classes/PaymentServices";
import { PaymentProject } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clientId, projectId }: PaymentProject = await req.json();

    if (!clientId) {
      throw new Error("missing `clientId` parameter");
    } else if (!projectId) {
      throw new Error("missing `projectId` parameter");
    }

    const newPayment = await PaymentService.create({ clientId, projectId });

    return NextResponse.json({ success: true, data: newPayment });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error });
    }
  }
}
