import PaymentService from "@/classes/PaymentServices";
import { DetailPaymentProject } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: DetailPaymentProject = await req.json();
    console.log(data);

    if (!data.payProjectId) {
      throw new Error("missing `payProjectId` parameter");
    } else if (!data.payProjectId) {
      throw new Error("missing `payProjectId` parameter");
    }

    const dataReq = {
      ...data,
      price: data.price.toString,
    };

    const updatedPayment = await PaymentService.addDetails(data);
    console.log(updatedPayment);

    return NextResponse.json({ success: true, data: updatedPayment });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error });
    }
  }
}
