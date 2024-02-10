import ClientService from "@/classes/ClientServices";
import { ScalarClient } from "@/types/Schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstname, lastname, password, email, avatar, phone }: ScalarClient =
      await req.json();

    const newClient = await ClientService.create({
      firstname,
      lastname,
      password,
      email,
      phone,
      avatar,
    });

    return NextResponse.json(newClient);
  } catch (error) {
    return NextResponse.json(error);
  }
}
