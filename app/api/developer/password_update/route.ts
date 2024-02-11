import SoftwareEngineerService from "@/classes/SoftwareEngineerService";
import { NextResponse } from "next/server";

// Actualizar la contraseña de un usuario por ID
export async function PUT(req: Request) {
  try {
    const { id, password } = await req.json();
    const updatedClient = await SoftwareEngineerService.updatePassword(
      id,
      password
    );

    return NextResponse.json({ success: true, data: updatedClient });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
