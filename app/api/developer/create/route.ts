import SoftwareEngineerService from "@/classes/SoftwareEngineerService";
import { ScalarSoftwareEngineer } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      firstname,
      lastname,
      password,
      email,
      avatar,
      phone,
      github,
    }: ScalarSoftwareEngineer = await req.json();

    const newClient = await SoftwareEngineerService.create({
      firstname,
      lastname,
      password,
      email,
      avatar,
      phone,
      github,
    });

    return NextResponse.json({ success: true, data: newClient });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return NextResponse.json({ success: true, error: error.message });
  }
}
