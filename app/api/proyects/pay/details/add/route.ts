import PaymentService from "@/classes/PaymentServices";
import { DetailPaymentProject } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const detail: DetailPaymentProject = await req.json();

    if (!detail.payProjectId) {
      throw new Error("missing `payProjectId` parameter");
    } else if (!detail.payProjectId) {
      throw new Error("missing `payProjectId` parameter");
    }

    const updatedPayment = await PaymentService.addDetails(detail);

    return NextResponse.json({ success: true, data: updatedPayment });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error });
    }
  }
}
