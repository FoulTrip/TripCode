import PaymentService from "@/classes/PaymentServices";
import { DetailPaymentProject } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { payProjectId }: { payProjectId: string } = await req.json();

    if (!payProjectId) {
      throw new Error("missing `payProjectId` parameter");
    }

    const updatedPayment =
      await PaymentService.getDetailsProjectPayByPayProjectId(payProjectId);

    return NextResponse.json({ success: true, data: updatedPayment });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error });
    }
  }
}
